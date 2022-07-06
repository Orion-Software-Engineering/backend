import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import db from '../models';
import config from '../config/auth.config';
import bcrypt from 'bcryptjs';

// TODO: clarify purpose of undefined funcs

const {Op} = Sequelize;
const {User, Role} = db;

// this controller manages sign up and sign in authorization with JWT

// module for signing up new users
export const signup = async (req: Request, res: Response) => {
    // per the Sequelize docs, create is synonymous to an INSERT operation with the given params
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            // don't store the raw password, encrypt it with bcrypt
            password: bcrypt.hashSync(req.body.password, 8),
        });

        const roles = await Role.findAll({
            where: {
                name: {[Op.or]: req.body.roles},
            },
        });

        if (!req.body.roles) {
            // set default role
            // TODO: confirm 0th index in base role
            await user.setRoles([roles[0]]);
            return res.send({message: 'User registered succefully!'});
        }
        await user.setRoles(roles);
        return res.send({message: 'User registered successfully!'});
    } catch ({message}) {
        return res.status(500).send({message});
    }

    Role.findAll({
      where: {
        name: {[Op.or]: req.body.roles},
      },
    });

    // TODO: setRoles to users here
    return res.send({message: 'User registered successfully!'});
  } catch ({message}) {
    return res.status(500).send({message});
  }
};

