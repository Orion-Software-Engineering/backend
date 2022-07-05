import {CreationOptional, DataTypes, Model, Optional} from 'sequelize';
import {sequelize} from './';

// define database model for roles

export default class Role extends Model<
  RoleAttributes,
  RoleCreationAttributes
> {
  declare id: CreationOptional<string>;
  declare name: string;
}

Role.init(
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
  {sequelize, tableName: 'roles'}
);

export type RoleAttributes = {
  id: string;
  name: string;
};

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;
