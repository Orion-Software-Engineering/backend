import {Optional} from 'sequelize';

export type ConversationAttributes = {
    id: string;
};

export type ConversationCreationAttributes = Optional<ConversationAttributes,
    'id'>;
