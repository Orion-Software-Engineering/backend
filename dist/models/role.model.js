"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// define database model for roles
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
};
