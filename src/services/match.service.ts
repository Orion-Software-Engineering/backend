import db, {sequelize} from '../models';
import {InterestAttributes} from '../models/interest';
import User from '../models/user';
import interestService from './interest.service';

type userObj = {
  userId: string;
  username: string;
  commonInterests: string[];
};

const findMatches = async (id: string) => {
  //  find interests of user
  const interests = await interestService.get(id);
  const interestNames = new Set();
  const interestIds = interests?.map(interest => {
    interestNames.add(interest.name);
    return interest.id;
  }) as string[];

  // find interests users with at most one shared interest
  const [records] = (await sequelize.query(
    'SELECT DISTINCT "userId" FROM user_interests WHERE "roleId" in (:interests) AND NOT "userId" = :user LIMIT 20',
    {replacements: {interests: interestIds, user: id}}
  )) as [{userId: string}[], unknown];

  // get details about matches
  const matchInterests = [];
  for (const {userId} of records) {
    // get all interests of given user with id  userId
    const userInterests = (await interestService.get(
      userId
    )) as InterestAttributes[];
    const {username} = (await db.User.findOne({where: {id: userId}})) as User;

    const user: userObj = {
      userId,
      username,
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
    a.commonInterests.length < b.commonInterests.length
      ? 1
      : a.commonInterests.length > b.commonInterests.length
      ? -1
      : 0
  );
};

export default {findMatches};
