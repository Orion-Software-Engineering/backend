import sequelize, {DataTypes} from "sequelize";

module.exports = (sequelize: sequelize.Sequelize, Sequelize: typeof DataTypes) => {
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
    })
}