import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {InterestAttributes} from '../interest';
import {EventAttributes, EventCreationAttributes} from './event.type';

// define database model for events
export default class Event extends Model<
  EventAttributes,
  EventCreationAttributes
> {
  declare event_name: String;
  declare eventId: CreationOptional<string>;
  declare event_date: Date;
  declare event_time: Date;
  declare event_venue: string;
  declare event_organizers: string;
  declare event_mcs: string;
  declare event_guests: string;
  declare age_restriction: boolean;
  declare event_description: string;

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
      type: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: true,
    },
    eventId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    event_venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_organizers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_mcs: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_guests: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age_restriction: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'event',
  }
);
