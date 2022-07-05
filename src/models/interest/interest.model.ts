import {CreationOptional, DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from '..';

// define the database model for interests
export default class Interest extends Model<
  InterestAttributes,
  InterestCreationAttributes
> {
  declare id: CreationOptional<string>;
  declare name: string;
}

Interest.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {sequelize, tableName: 'interests'}
);

export type InterestAttributes = {
  id: string;
  name: string;
};

type InterestCreationAttributes = Optional<InterestAttributes, 'id'>;
