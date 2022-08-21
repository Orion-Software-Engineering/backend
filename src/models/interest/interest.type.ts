import {Optional} from 'sequelize';

export type InterestAttributes = {
    id: string;
    name: string;
};

export type InterestCreationAttributes = Optional<InterestAttributes, 'id'>;
