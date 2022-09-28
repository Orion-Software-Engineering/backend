import db, {sequelize} from '../models'
import interestService from "./interest.service";
import userConversationService from "./user.conversation.service";

// can you locate the file where user matches are returned
//Sven you there?, okay sharp, where's the issue?  //line 48, the highlighted one
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
    let proximity: string = ''
    return earthRadiusKm * c;
}


//user info
let Info: (string | number)[];


export const sortByLocation = async (userId: string) => {
    const user = await User.findByPk(userId)
    if (!user) return

    // get convos of user
    const userConversations = await user.getConversations()
        .then(conversations => conversations.map(convo => convo.id))

    const [userLatitude, userLongitude] = user.location.split(' ', 2)
        .map(i => Number(i))

    // store userId,bio and name with relative distance
    const userDistance = new Map<number, [string, string, string, number]>()

    const userDistanceArray: { id: string, username: string, bio: string, proximity: number }[] = []

    const interests = await interestService.get(userId);
    const interestNames = new Set();
    const interestIds = interests?.map(interest => {
        interestNames.add(interest.name);
        return interest.id;
    }) as string[];


    const [records] = (await sequelize.query(
        'SELECT DISTINCT "userId" FROM user_interests WHERE "roleId" in (:interests) AND NOT "userId" = :user LIMIT 20',
        {replacements: {interests: interestIds, user: userId}} //over here? i mean the line above
    )) as [{ userId: string }[], unknown];

    // get details about matches from matched users
    for (const {userId} of records) {
        let mUser = {}
        // a matched user based on interest
        const matchedUser = await User.findByPk(userId)
        if (!matchedUser) continue
        const matchedUserConversations = await matchedUser.getConversations()
            .then(conversations => conversations.map(convo => convo.id))

        let breakFlag = false

        // if user has convo with main user, skip
        for (const cv of matchedUserConversations) {
            if (userConversations.includes(cv)) breakFlag = true
        }
        if (breakFlag) continue

        const matchedUsername = matchedUser.username;
        const userBio = matchedUser.bio;


        let proximity: number = 0;

        const {location} = matchedUser
        const [latitude, longitude] = location.split(' ', 2)
            .map(i => Number(i));

        if (calculateDistance(userLatitude, userLongitude, latitude, longitude) < 1000) {
            proximity = 0  // very close
        }
        if (calculateDistance(userLatitude, userLongitude, latitude, longitude) >= 1000
            && calculateDistance(userLatitude, userLongitude, latitude, longitude) <= 3000) {
            proximity = 1   //close
        }
        if (calculateDistance(userLatitude, userLongitude, latitude, longitude) >= 3000
            && calculateDistance(userLatitude, userLongitude, latitude, longitude) <= 5000) {
            proximity = 2    //quite close
        }
        if (calculateDistance(userLatitude, userLongitude, latitude, longitude) > 5000) {
            proximity = 3    //far
        }


        userDistance.set(calculateDistance(userLatitude, userLongitude, latitude, longitude), [userId, matchedUsername, userBio, proximity])
        mUser = {id: userId, username: matchedUsername, bio: userBio, proximity: proximity}
        userDistanceArray.push((mUser as unknown as { id: string, username: string, bio: string, proximity: number }))

    }
    // console.log(userDistance)
    const sortedmap = new Map([...userDistance.entries()].sort())


    // console.log(sortedmap)
    // return sortedmap.values()
    return userDistanceArray
}
