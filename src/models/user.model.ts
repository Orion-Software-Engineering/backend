import Sequelize, {
  CreationOptional,
  DataTypes,
  Model,
  Optional,
} from 'sequelize';
import {sequelize} from '.';
import {RoleAttributes} from './role.model';
import {InterestAttributes} from './interest.model';

// define database model for users
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  declare id: CreationOptional<string>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare isEmailVerified: boolean;
  declare getRoles: Sequelize.BelongsToManyGetAssociationsMixin<RoleAttributes>;
  declare setRoles: Sequelize.BelongsToManySetAssociationsMixin<
    RoleAttributes,
    RoleAttributes['id']
  >;
  declare getInterests: Sequelize.BelongsToManyGetAssociationsMixin<InterestAttributes>;
  declare setInterests: Sequelize.BelongsToManySetAssociationsMixin<
    InterestAttributes,
    InterestAttributes['id']
  >;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

type UserAttributes = {
  id: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
};

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'isEmailVerified'
>;
