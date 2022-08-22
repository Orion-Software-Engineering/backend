import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {
    ConversationAttributes,
    ConversationCreationAttributes,
} from './conversation.type';
import {UserAttributes} from '../user';
import {MessageAttributes} from '../message';

export default class Conversation extends Model<ConversationAttributes,
    ConversationCreationAttributes> {
    declare id: CreationOptional<string>;
    declare getUsers: Sequelize.BelongsToManyGetAssociationsMixin<UserAttributes>;
    declare setUsers: Sequelize.BelongsToManySetAssociationsMixin<UserAttributes,
        UserAttributes['id']>;
    declare addMessage: Sequelize.BelongsToManyAddAssociationsMixin<MessageAttributes,
        MessageAttributes['id']>;
    declare removeMessage: Sequelize.BelongsToManyRemoveAssociationsMixin<MessageAttributes,
        MessageAttributes['id']>;
    declare getMessages: Sequelize.BelongsToManyGetAssociationsMixin<MessageAttributes>;
}

Conversation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
    },
    {sequelize, tableName: 'conversations'}
);
