import {Optional} from 'sequelize';

export type LikeAttributes = {
    eventId: string,
    like: boolean,
    userId: string
};

export type LikeCreationAttributes = Optional<LikeAttributes,
    'eventId' | 'userId'>
