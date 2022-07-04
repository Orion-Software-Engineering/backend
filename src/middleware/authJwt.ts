import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/auth.config';
import db from '../models';

const {User} = db;

// various modules for access checks with token verification

const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.headers['x-access-token'];
  // get token from request and return if null
  if (!token) {
    return res.status(403).send({
      message: 'No token provided',
    });
  }

  // check that the token is actually a string else JWT will cry
  if (typeof token === 'string') {
    jwt.verify(token, config.secret, (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          message: 'Unauthorized',
        });
      }
      // @ts-ignore
      req.userId = decoded.id; // add a new entry called userId, needed later
      next(); // simply invokes the next middleware function
    });
  }
};

// middleware function to check if user is an admin
const isAdmin = (req: Request, res: Response, next: Function) => {
  // @ts-ignore
  User.findByPk(req.userId).then(user => {
    User.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }
      res.status(403).send({
        message: 'Requires Admin Role!',
      });
      return;
    });
  });
};

// middleware function to check if user is a moderator
const isModerator = (req: Request, res: Response, next: Function) => {
  // @ts-ignore
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
      }
      res.status(403).send({
        message: 'Requires Moderator Role',
      });
    });
  });
};

// check if user is either admin or moderator
const isModeratorOrAdmin = (req: Request, res: Response, next: Function) => {
  // @ts-ignore
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next();
          return;
        }
        if (roles[i].name === 'admin') {
          next();
          return;
        }
      }
      res.status(403).send({
        message: 'Requires Moderator or Admin Role',
      });
    });
  });
};

// export the functions
export const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
