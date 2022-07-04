import sequelize, {DataTypes} from "sequelize";

// define database model for roles

module.exports = (sequelize: sequelize.Sequelize, Sequelize: typeof DataTypes) => {
    return sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    })
}