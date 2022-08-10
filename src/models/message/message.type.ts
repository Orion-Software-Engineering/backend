import {Optional} from 'sequelize';

export type MessageAttributes = {
    id: string;
    text: string;
    userId: string
};

export type MessageCreationAttributes = Optional<MessageAttributes, 'id'>;
