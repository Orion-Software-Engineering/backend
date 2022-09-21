import {Optional} from 'sequelize';

export type DeletedUserAttributes = {
    id: string;
    username: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    dateOfBirth: Date;
    gender: boolean;
    location: string;
    bio: string;
};

export type DeletedUserCreationAttributes = Optional<DeletedUserAttributes,
    'id' | 'isEmailVerified' | 'location' | 'bio'>;
