import {Op} from 'sequelize';
import db from '../models';

const get = async (id: string) => {
    const user = await db.User.findByPk(id);
    if (user) {
        return user.getInterests();
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
        return user.getInterests()
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
        return user.getInterests()
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
        return user.getInterests()
    }
};

export default {get, add, set, remove};
