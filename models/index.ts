import {Sequelize} from 'sequelize'

const config = require('../config/db.config');

/* Heroku essential
* Heroku provides a database url, but locally we do not need that.
* If testing locally, we use our config
* else we use the provided database url (it changes so do not hardcode the value!)
* */
const sequelize = process.env.DATABASE_URL ?
    new Sequelize(process.env.DATABASE_URL,
        {
            "dialect": "postgres",
            "dialectOptions": {
                "ssl": {
                    "require": true,
                    "rejectUnauthorized": false
                }
            },
        })
    :
    new Sequelize(
        config.DB,
        config.USER,
        config.PASSWORD,
        {
            host: config.HOST,
            dialect: config.dialect,
            // @ts-ignore
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle,
            }
        }
    )

// the db variable will store database info for use
const db = {};
// @ts-ignore
db.Sequelize = Sequelize;
// @ts-ignore
db.sequelize = sequelize;
// @ts-ignore
db.user = require("../models/user.model.js")(sequelize, Sequelize);
// @ts-ignore
db.role = require("../models/role.model.js")(sequelize, Sequelize);
// @ts-ignore
db.interest = require("../models/interest.model.js")(sequelize, Sequelize)

// one role can have many users
// @ts-ignore
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

// one user can have multiple roles
// @ts-ignore
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// one interest can have multiple users
// @ts-ignore
db.interest.belongsToMany(db.user, {
    through: "user_interests",
    foreignKey: "userId",
    otherKey: "roleId"
})

// one user can have multiple interests
//@ts-ignore
db.user.belongsToMany(db.interest, {
    through: "user_interests",
    foreignKey: "userId",
    otherKey: "roleId"
})
// @ts-ignore
db.ROLES = ["user", "admin", "moderator"];
// @ts-ignore
db.INTERESTS = ["art", "business", "cars", "comedy", "education", "entertainment",
    "food", "fashion", "gaming", "health", "beauty", "news", "photography", "science", "sports",]

module.exports = db;
