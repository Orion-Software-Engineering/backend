import {Optional} from 'sequelize';

export type ImageAttributes = {
    id: string;
};

export type ImageCreationAttributes = Optional<ImageAttributes, 'id'>;
