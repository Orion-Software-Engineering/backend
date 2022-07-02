import sequelize, {DataTypes} from "sequelize";

module.exports = (sequelize: sequelize.Sequelize, Sequelize: typeof DataTypes) => {
    // TODO: Address sequelize types
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