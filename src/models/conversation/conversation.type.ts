import {Optional} from 'sequelize';

export type ConversationAttributes = {
  id: string;
  unseenCount: number;
  // userId, sendId, lastMessageId => taken care using foreign-keys(associations):
};

export type ConversationCreationAttributes = Optional<
  ConversationAttributes,
  'id'
> & {
  userId: string;
  sendId: string;
};
