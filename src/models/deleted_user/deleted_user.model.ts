import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {RoleAttributes} from '../role';
import {InterestAttributes} from '../interest';
import {ConversationAttributes} from '../conversation';
import {EventAttributes} from "../event";
import {DeletedUserAttributes, DeletedUserCreationAttributes} from "./deleted_user.type";

// define database model for deleted users
export default class DeletedUser extends Model<DeletedUserAttributes,
    DeletedUserCreationAttributes> {
    declare id: CreationOptional<string>;
    declare username: string;
    declare email: string;
    declare password: string;
    declare isEmailVerified: boolean;
    declare dateOfBirth: string;
    declare gender: boolean;
    declare location: string;
    declare bio: string;
    declare getRoles: Sequelize.BelongsToManyGetAssociationsMixin<RoleAttributes>;
    declare setRoles: Sequelize.BelongsToManySetAssociationsMixin<RoleAttributes,
        RoleAttributes['id']>;
    declare getInterests: Sequelize.BelongsToManyGetAssociationsMixin<InterestAttributes>;
    declare setInterests: Sequelize.BelongsToManySetAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
    declare addInterests: Sequelize.BelongsToManyAddAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
    declare removeInterests: Sequelize.BelongsToManyRemoveAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
    declare addConversations: Sequelize.BelongsToManyAddAssociationsMixin<ConversationAttributes,
        ConversationAttributes['id']>;
    declare getConversations: Sequelize.BelongsToManyGetAssociationsMixin<ConversationAttributes>;
    declare removeConversations: Sequelize.BelongsToManyRemoveAssociationsMixin<ConversationAttributes,
        ConversationAttributes['id']>;
    declare getLikedEvents: Sequelize.BelongsToManyGetAssociationsMixin<EventAttributes>;
    declare addLikedEvents: Sequelize.BelongsToManyAddAssociationsMixin<EventAttributes, EventAttributes['id']>;
    declare removeLikedEvents: Sequelize.BelongsToManyRemoveAssociationsMixin<EventAttributes,
        EventAttributes['id']>
}

DeletedUser.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        isEmailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        gender: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: ""
        },
        bio: {
            type: DataTypes.TEXT,
            defaultValue: ""
        }
    },
    {
        sequelize,
        tableName: 'deleted_users',
    }
);
