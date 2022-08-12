import {Sequelize} from 'sequelize';

import config from '../config/db.config';

/* Heroku essential
 * Heroku provides a database url, but locally we do not need that.
 * If testing locally, we use our config
 * else we use the provided database url (it changes so do not hardcode the value!)
 * Not the best method. Will be refactored on later iterations.
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
// putting model imports above runs model instantiation before data start
// TODO: extract database startup into a separate component
import User from './user';
import Role from './role/';
import Interest from './interest';
import Conversation from './conversation/';
import Message from './message';
import Event from './event';

// the db variable will store database info for use
const db = {
  User,
  Role,
  Interest,
  Conversation,
  Message,
  Event,
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

// one role can have many users
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

// a conversation can have multiple messages
db.Conversation.belongsToMany(db.Message, {through: 'conversation_messages'});

// a message can have multiple conversations(two) i.e one for sender and one for receiver
db.Message.belongsToMany(db.Conversation, {through: 'conversation_messages'});

// a conversation can have only one user(owner)
db.Conversation.belongsTo(db.User, {as: 'owner'});

// a conversation can have only one sender
db.Conversation.belongsTo(db.User, {as: 'sender'});

// a user can have multiple conversations
db.User.hasMany(db.Conversation);

// a message can have only one author(sender)
db.Message.belongsTo(db.User);

// a user can have multiple messages
db.User.hasMany(db.Message);

// an event can have many organizers
db.Event.belongsTo(db.Event);

export default db;
export {sequelize};
