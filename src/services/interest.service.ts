import {Op} from 'sequelize';
import db from '../models';

const get = async (id: string) => {
    const user = await db.User.findByPk(id);
    if (user) {
        return await user.getInterests()
    }
};

const set = async (id: string, interests: string[]) => {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw new Error('No such user');
    }

    const validInterest = await db.Interest.findAll({
        where: {
            name: {
                [Op.or]: interests,
            },
        },
    });

    if (user) {
        await user.setInterests(validInterest);
        return asObject(await user.getInterests())
    }
};

const add = async (id: string, interests: string[]) => {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw new Error('No such user');
    }

    const validInterest = await db.Interest.findAll({
        where: {
            name: {
                [Op.or]: interests,
            },
        },
    });

    if (user) {
        await user.addInterests(validInterest);
        return asObject(await user.getInterests())
    }
};

const remove = async (id: string, interests: string[]) => {
    const user = await db.User.findByPk(id);

    if (!user) {
        throw new Error('No such user');
    }

    const validInterest = await db.Interest.findAll({
        where: {
            name: {
                [Op.or]: interests,
            },
        },
    });

    if (user) {
        await user.removeInterests(validInterest);
        return asObject(await user.getInterests())
    }
};

const asObject = async (arr: Array<any>) => {
    return arr[0]
}

export default {get, add, set, remove};
