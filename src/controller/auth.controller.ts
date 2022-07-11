import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import db from '../models';
import config from '../config/auth.config';
import bcrypt from 'bcryptjs';
import {sendMail} from '../mailer/mailer';

const {Op} = Sequelize;
const {User, Role} = db;

// this controller manages sign up and sign in authorization with JWT

// module for signing up new users
export const signup = async (req: Request, res: Response) => {
  // per Sequelize docs, create is synonymous to an INSERT operation with the given params
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      // don't store the raw password, encrypt it with bcrypt
      password: bcrypt.hashSync(req.body.password, 8),
      dateOfBirth: req.body.dob,
    }).then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then(roles => {
          user.setRoles(roles);
        });
      } else {
        Role.findAll({
          where: {
            name: 'user',
          },
        }).then(roles => {
          user.setRoles(roles);
        });
      }
      const verificationLink = `${process.env.VERIFICATION_URL}?tag=${user.id}`;
      sendMail(req.body.email, verificationLink);
    });

    return res.status(201).send({message: 'User registered successfully!'});
  } catch ({message}) {
    return res.status(500).send({message});
  }
};

// module for logging in users
export const signIn = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
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

    // generate the token with JWT with 60 days expiration
    const token = jwt.sign({id: user.id}, config.secret, {
      expiresIn: 5184000,
    });

    const rolesRaw = await user.getRoles();
    const roles = rolesRaw.map(({name}) => `ROLE_${name.toUpperCase()}`);

    // return the user's credentials and access token
    //TODO: return only the id and access token, but not now
    return res.status(200).send({
      roles,
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  } catch ({message}) {
    return res.status(500).send({message});
  }
};
