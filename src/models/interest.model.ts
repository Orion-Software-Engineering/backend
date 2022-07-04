import sequelize, {DataTypes} from "sequelize";

// define the database model for interests

module.exports = (sequelize: sequelize.Sequelize, Sequelize: typeof DataTypes) => {
    return sequelize.define('interests', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    })
}