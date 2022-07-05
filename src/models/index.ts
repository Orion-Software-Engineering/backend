import {Sequelize} from 'sequelize';

import config from '../config/db.config';

/* Heroku essential
 * Heroku provides a database url, but locally we do not need that.
 * If testing locally, we use our config
 * else we use the provided database url (it changes so do not hardcode the value!)
 * */
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize(config.DB, config.USER, config.PASSWORD, {
      host: config.HOST,
      dialect: config.dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle,
      },
    });

// models need and instant of sequelize to be able to initialize
// putting model imports above runs model instatiation before data start
// TODO: extract database startup into a separate component
import User from './user.model';
import Role from './role.model';
import Interest from './interest.model';

// the db variable will store database info for use
const db = {
  User,
  Role,
  Interest,
  ROLES: ['user', 'admin', 'moderator'],
  INTERESTS: [
    'art',
    'business',
    'cars',
    'comedy',
    'education',
    'entertainment',
    'food',
    'fashion',
    'gaming',
    'health',
    'beauty',
    'news',
    'photography',
    'science',
    'sports',
  ],
};

// one role can have many u
db.Role.belongsToMany(db.User, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});

// one user can have multiple roles
db.User.belongsToMany(db.Role, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

// one interest can have multiple users
db.Interest.belongsToMany(db.User, {
  through: 'user_interests',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

// one user can have multiple interests
db.User.belongsToMany(db.Interest, {
  through: 'user_interests',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

export default db;
export {sequelize};
