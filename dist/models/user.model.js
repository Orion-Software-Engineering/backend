"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('users', {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        }
    });
};
