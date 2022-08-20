import {Optional} from 'sequelize';

export type EventAttributes = {
    id: string;
    name: string;
    description: string;
    date: Date;
    venue: string;
    organizers: string;
    mcs: string;
    guests: string;
    age_restriction: number;
};

export type EventCreationAttributes = Optional<EventAttributes, 'id' | 'guests' | 'mcs'>;
