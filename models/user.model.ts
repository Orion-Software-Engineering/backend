import sequelize, {DataTypes} from "sequelize";

// define database model for users

module.exports = (sequelize: sequelize.Sequelize, Sequelize: typeof DataTypes) => {
    return sequelize.define('users', {
        //TODO: check this later
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
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