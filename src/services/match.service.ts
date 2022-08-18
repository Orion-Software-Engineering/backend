import db, {sequelize} from '../models';
import interestService from './interest.service';

const findMatches = async (id: string) => {
  //  find interests of user
  const interests = await interestService.get(id);
  const interestIds = interests?.map(interest => {
    return interest.id;
  }) as string[];
  // find interests users with at most one shared interest

  const [result] = await sequelize.query(
    'SELECT DISTINCT "userId" FROM user_interests WHERE "roleId" in (:interests) AND NOT "userId" = :user LIMIT 20',
    {replacements: {interests: interestIds, user: id}}
  );
  // get interest of each user in unique array
  // order them in order of most shared interests
  return result;
};

export default {findMatches};
