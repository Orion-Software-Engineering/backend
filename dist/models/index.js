"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config = require('../config/db.config');
const sequelize = process.env.DATABASE_URL ?
    new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        "dialect": "postgres",
        "dialectOptions": {
            "ssl": {
                "require": true,
                "rejectUnauthorized": false
            }
        },
    })
    :
        new sequelize_1.Sequelize(config.DB, config.USER, config.PASSWORD, {
            host: config.HOST,
            dialect: config.dialect,
            // @ts-ignore
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                acquire: config.pool.acquire,
                idle: config.pool.idle,
            }
        });
const db = {};
// @ts-ignore
db.Sequelize = sequelize_1.Sequelize;
// @ts-ignore
db.sequelize = sequelize;
// @ts-ignore
db.user = require("../models/user.model.js")(sequelize, sequelize_1.Sequelize);
// @ts-ignore
db.role = require("../models/role.model.js")(sequelize, sequelize_1.Sequelize);
// @ts-ignore
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
// @ts-ignore
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
// @ts-ignore
db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
