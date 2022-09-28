import db, {sequelize} from '../models';
import {InterestAttributes} from '../models/interest';
import User from '../models/user';
import interestService from './interest.service';

type userObj = {
    userId: string;
    username: string;
    bio: string,
    commonInterests: string[];
};

const findMatches = async (id: string) => {
    const user = await User.findByPk(id)
    if (!user) return
    //  find interests of user
    const interests = await interestService.get(id);
    const interestNames = new Set();
    const interestIds = interests?.map(interest => {
        interestNames.add(interest.name);
        return interest.id;
    }) as string[];

    // find interests users with at least one shared interest
    const [records] = (await sequelize.query(
        'SELECT DISTINCT "userId" FROM user_interests WHERE "roleId" in (:interests) AND NOT "userId" = :user LIMIT 20',
        {replacements: {interests: interestIds, user: id}}
    )) as [{ userId: string }[], unknown];

    const userConversations = await user.getConversations()
        .then(conversations => conversations.map(convo => convo.id))
    // get details about matches
    const matchInterests = [];
    for (const {userId} of records) {
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
        // get all interests of given user with id  userId
        const userInterests = (await interestService.get(
            userId
        )) as InterestAttributes[];
        const {username, bio} = (await db.User.findOne({where: {id: userId}})) as User;

        const user: userObj = {
            userId,
            username,
            bio,
            commonInterests: [],
        };

        // push shared interests
        for (const {name} of userInterests) {
            if (interestNames.has(name)) {
                user.commonInterests.push(name);
            }
        }

        matchInterests.push(user);
    }

    // get interest of each user in unique array
    // order them in order of most shared interests
    return matchInterests.sort((a, b) =>
        a.commonInterests.length < b.commonInterests.length ? 1
            : a.commonInterests.length > b.commonInterests.length ? -1
                : 0
    );
};

export default {findMatches};
