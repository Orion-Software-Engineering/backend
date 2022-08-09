import {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {MessageAttributes, MessageCreationAttributes} from './message.type';

export default class Message extends Model<MessageAttributes,
    MessageCreationAttributes> {
    declare id: CreationOptional<string>;
    declare text: string;
}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {sequelize, tableName: 'messages'}
);
