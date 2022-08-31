import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {InterestAttributes} from '../interest';
import {EventAttributes, EventCreationAttributes} from './event.type';

// define database model for events
export default class Event extends Model<EventAttributes,
    EventCreationAttributes> {
    declare id: CreationOptional<string>;
    declare name: String;
    declare description: string;
    declare date: Date;
    declare time: string;
    declare venue: string;
    declare organizers: string;
    declare mcs: string;
    declare guests: string;
    declare age_restriction: boolean;
    declare organizer: string;
    declare cover_image: string;

    declare getInterests: Sequelize.BelongsToManyGetAssociationsMixin<InterestAttributes>;
    declare setInterests: Sequelize.BelongsToManySetAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
    declare addInterests: Sequelize.BelongsToManyAddAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
    declare removeInterests: Sequelize.BelongsToManyRemoveAssociationsMixin<InterestAttributes,
        InterestAttributes['id']>;
}

Event.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            defaultValue: '00:00'
        },
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        organizers: {
            type: DataTypes.STRING,
        },
        mcs: {
            type: DataTypes.STRING,
        },
        guests: {
            type: DataTypes.STRING,
        },
        age_restriction: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        organizer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cover_image: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'events',
    }

);
