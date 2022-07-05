import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {RoleAttributes} from '../role';
import {InterestAttributes} from '../interest';
import {UserAttributes, UserCreationAttributes} from './user.type';

// define database model for users
export default class User extends Model<UserAttributes,
    UserCreationAttributes> {
    declare id: CreationOptional<string>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare isEmailVerified: boolean;
    declare getRoles: Sequelize.BelongsToManyGetAssociationsMixin<RoleAttributes>;
    declare setRoles: Sequelize.BelongsToManySetAssociationsMixin<RoleAttributes,
        RoleAttributes['id']>;
    declare getInterests: Sequelize.BelongsToManyGetAssociationsMixin<InterestAttributes>;
    declare setInterests: Sequelize.BelongsToManySetAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);
