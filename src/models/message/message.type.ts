import {Optional} from 'sequelize';

export type MessageAttributes = {
  id: string;
  idHash: string; // a simple hash to be able to query messages fast i.e concatenated sorted id's on message participants
  text: string;
  senderId?: string;
};

export type MessageCreationAttributes = Optional<MessageAttributes, 'id'>;
