import {Optional} from 'sequelize';

export type EventAttributes = {
    event_name: string;
    eventId: String;
    event_date: Date;
    event_time: Date;
    event_venue: string;
    event_organizers: string;
    event_mcs: string;
    event_guests: string;
    age_restriction: number;
    event_description: string;
};

export type EventCreationAttributes = Optional<
    EventAttributes,
    'eventId' | 'event_organizers'
    >;

