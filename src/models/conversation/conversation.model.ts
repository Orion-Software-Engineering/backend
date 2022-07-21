import {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {
  ConversationAttributes,
  ConversationCreationAttributes,
} from './conversation.type';

export default class Conversation extends Model<
  ConversationAttributes,
  ConversationCreationAttributes
> {
  declare id: CreationOptional<string>;
  declare unseenCount: number;
}

Conversation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    unseenCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {sequelize, tableName: 'conversations'}
);
