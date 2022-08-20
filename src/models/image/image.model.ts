import Sequelize, {CreationOptional, DataTypes, Model} from 'sequelize';
import {sequelize} from '..';
import {ImageAttributes, ImageCreationAttributes} from './image.type';

// define database model for Images
export default class Image extends Model<ImageAttributes,
    ImageCreationAttributes> {
    declare id: CreationOptional<string>;
}

Image.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'images',
    }
);
