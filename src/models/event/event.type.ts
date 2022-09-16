import {Optional} from 'sequelize';

export type EventAttributes = {
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
    age_restriction: number;
    organizer: string;
    cover_image: string;
};

export type EventCreationAttributes = Optional<EventAttributes,
    'id' | 'guests' | 'mcs' | 'cover_image'>
