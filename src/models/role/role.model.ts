import {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {RoleAttributes, RoleCreationAttributes} from './role.type';

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
