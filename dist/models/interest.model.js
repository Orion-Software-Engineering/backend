"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// define the database model for interests
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('interests', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
};
