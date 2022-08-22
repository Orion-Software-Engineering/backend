import {Optional} from 'sequelize';

export type ImageAttributes = {
    id: string;
    url: string;
};

export type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;
