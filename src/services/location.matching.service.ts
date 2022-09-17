import db, {sequelize} from '../models'
import interestService from "./interest.service";


const {User} = db
//change from degree to radians
function degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
}

//calculate relative distance
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    let earthRadiusKm = 6371;

    let dLat = degreesToRadians(lat2 - lat1);
    let dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

export const sortByLocation = async (userId: string) => {
    const user = await User.findByPk(userId)
    if (!user) return
    const [userLatitude, userLongitude] = user.location.split(' ', 2)
        .map(i => Number(i))

    const userDistance = new Map<[string, string, string], number>() // store userId,bio and name with relative distance

    const interests = await interestService.get(userId);
    const interestNames = new Set();
    const interestIds = interests?.map(interest => {
        interestNames.add(interest.name);
        return interest.id;
    }) as string[];

    const [records] = (await sequelize.query(
        'SELECT DISTINCT "userId" FROM user_interests WHERE "roleId" in (:interests) AND NOT "userId" = :user LIMIT 20',
        {replacements: {interests: interestIds, user: userId}}
    )) as [{ userId: string }[], unknown];

    // get details about matches from matched users
    for (const {userId} of records) {
        // a matched user based on interest
        const matchedUser = await User.findByPk(userId)
        if (!matchedUser) return



        const matchedUsername = matchedUser.username
        const userBio = matchedUser.bio


        const {location} = matchedUser
        const [latitude, longitude] = location.split(' ', 2)
            .map(i => Number(i));
        userDistance.set([userId, matchedUsername, userBio], calculateDistance(userLatitude, userLongitude, latitude, longitude))

    }
    console.log(userDistance)
    const sortedmap = new Map([...userDistance.entries()]
        .sort((a, b) => a[1] - b[1]))

    return sortedmap

}