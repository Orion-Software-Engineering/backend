import {Request, Response} from 'express';
import db from '../models';

const {User, Interest} = db;


export const getUsername = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.userId)

        if (user) return res.status(200).send(user.username);
        return res.status(404).send()
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.userId
            },
            include: [{
                model: db.Interest,
                attributes: ['id', 'name'],
            }]
        })

        if (user) return res.status(200).send(user)
        return res.status(404).send()
    } catch ({message}) {
        res.status(400).send({message})
    }
}

export const updateUserBio = async (req: Request, res: Response) => {
    try {
        const {userId, bio} = req.body
        const user = await User.update({
            bio: bio
        }, {
            where: {
                id: userId
            }
        })

        return res.status(200).send(user)
    } catch ({message}) {
        return res.status(400).send({message})
    }

}

// basic controllers for content
export const allAccess = (req: Request, res: Response) => {
    res.status(200).send('Public Content');
};

export const userBoard = (req: Request, res: Response) => {
    res.status(200).send('User Content.');
};

export const adminBoard = (req: Request, res: Response) => {
    res.status(200).send('Admin Content.');
};

export const moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send('Moderator Content.');
};

// show all registered users
export const showAll = async (req: Request, res: Response) => {
    try {
        await User.findAll()
            .then(users => {
                res.status(200).send({users})
            });
    } catch ({message}) {
        res.status(400).send({message})
    }
};
