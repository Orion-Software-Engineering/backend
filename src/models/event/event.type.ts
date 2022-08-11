import {Optional} from 'sequelize';

export type EventAttributes = {
    event_name: string;
    event_date: Date;
    event_time: Date;
    venue: string;
    organizers: string;
    MCs: string;
    Guests: string;
    Age_restriction: boolean;
    description: string;
};

export type EventCreationAttributes = Optional<
    EventAttributes,
    'event_name' | 'organizers'
    >;
