import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {LikeCreationAttributes, LikeAttributes} from './like.type';

// define database model for likes
export default class Like extends Model<LikeAttributes,
    LikeCreationAttributes> {
    declare eventId: string;
    declare like: string;
    declare userId: string;
}

Like.init(
    {
        eventId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        like: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'event_like',
    }
);
