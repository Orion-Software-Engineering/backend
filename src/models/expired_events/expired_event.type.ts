import {Optional} from 'sequelize';

export type ExpiredEventAttributes = {
    id: string;
    name: string;
    description: string;
    date: Date;
    time: string;
    venue: string;
    location: string;
    organizers: string;
    mcs: string;
    guests: string;
    age_restriction: boolean;
    organizer: string;
    cover_image: string;
};

export type ExpiredEventCreationAttributes = Optional<ExpiredEventAttributes,
    'id' | 'guests' | 'mcs' | 'cover_image'>
