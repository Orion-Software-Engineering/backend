import {Optional} from 'sequelize';

export type UserAttributes = {
    id: string;
    username: string;
    email: string;
    password: string;
    deviceId:string;
    isEmailVerified: boolean;
    dateOfBirth: Date;
    gender: boolean;
    location: string;
    bio: string;
};

export type UserCreationAttributes = Optional<UserAttributes,
    'id' | 'isEmailVerified' | 'location' | 'bio'>;
