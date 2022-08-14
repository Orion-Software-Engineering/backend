import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {InterestAttributes} from '../interest';
import {EventAttributes, EventCreationAttributes} from './event.type';

// define database model for events
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
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.STRING,
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
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'event',
  }
);
