import {Optional} from 'sequelize';

export type UserAttributes = {
  id: string;
  username: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  dateOfBirth: Date;
  gender: boolean;
  location: string;
};

export type UserCreationAttributes = Optional<UserAttributes,
    'id' | 'isEmailVerified'>;
