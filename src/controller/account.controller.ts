import {Request, Response} from 'express';
import db from '../models';
import bcrypt from "bcryptjs";

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const user = await db.User.findOne({
            where: {
                // we want only one user with the passed username (there cant be duplicate usernames anyway)
                username: req.body.username,
            },
        });

        if (!user) {
            //user is null
            return res.status(404).send({message: 'User not found'});
        }

        const passwordIsValid = bcrypt.compareSync(
            // use bcrypt to compare given password to stored password
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(404).send({message: 'Invalid Credentials'});
        }

        // copy to another table and delete from working table
        await db.DeletedUser.create({
            username: user.username,
            email:  user.email,
            password: user.password,
            dateOfBirth: user.dateOfBirth,
            gender: user.gender,
        }).then(async () => {
            await db.User.destroy({
                where: {
                    id: req.body.userId
                }
            })
            return res.status(204).send("Account deleted successfully.")
        })


    } catch ({message}) {
        return res.status(500).send({message})
    }
}
