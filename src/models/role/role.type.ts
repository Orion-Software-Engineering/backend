import {Optional} from 'sequelize';

export type RoleAttributes = {
  id: string;
  name: string;
};

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;
