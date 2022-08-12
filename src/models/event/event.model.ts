import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {InterestAttributes} from '../interest';
import {EventAttributes, EventCreationAttributes} from './event.type';

// define database model for users
export default class Event extends Model<
    EventAttributes,
    EventCreationAttributes
> {
    declare event_name: CreationOptional<string>;
    declare event_date: Date;
    declare event_time: Date;
    declare venue: string;
    declare organizers: string;
    declare MCs: string;
    declare Guests: string;
    declare Age_restriction: boolean;
    declare description: string;

    declare getInterests: Sequelize.BelongsToManyGetAssociationsMixin<InterestAttributes>;
    declare setInterests: Sequelize.BelongsToManySetAssociationsMixin<
        InterestAttributes,
        InterestAttributes['id']
        >;
    declare addInterests: Sequelize.BelongsToManyAddAssociationsMixin<
        InterestAttributes,
        InterestAttributes['id']
        >;
    declare removeInterests: Sequelize.BelongsToManyRemoveAssociationsMixin<
        InterestAttributes,
        InterestAttributes['id']
        >;
}

Event.init(
    {
        event_name: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: true,
        },
        event_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        event_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizers: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        MCs: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Guests: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Age_restriction: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'event',
    }
);
