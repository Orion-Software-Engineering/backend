import {Optional} from 'sequelize';

export type MessageAttributes = {
  id: string;
  identifier: string;
  text: string;
  senderId: string;
};

export type UserCreationAttributes = Optional<MessageAttributes, 'id'>;
