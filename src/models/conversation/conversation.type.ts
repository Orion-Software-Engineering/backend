import {Optional} from 'sequelize';

export type ConversationAttributes = {
  id: string;
  unseenCount: number;
  // userId, sendId, lastMessage => taken care using foreign-keys(associations):
  userId: string;
  sendId: string;
};

export type UserCreationAttributes = Optional<ConversationAttributes, 'id'>;
