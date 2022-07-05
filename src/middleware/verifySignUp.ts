import {Request, Response} from 'express';
import db from '../models';

const {ROLES, INTERESTS, User} = db;

const checkDuplicatedUsernameOrEmail = (
  req: Request,
  res: Response,
  next: Function
) => {
  User.findOne({
    where: {username: req.body.username},
  }).then((user: any) => {
    if (user) {
      res.status(400).send({
        message: 'Duplicated username',
      });
      return;
    }

    // check email is not duplicate
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user: any) => {
      if (user) {
        res.status(400).send({
          message: 'Duplicated email',
        });
        return;
      }
      next();
    });
  });
};

const checkRolesExisted = (req: Request, res: Response, next: Function) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: 'Role does not exist',
        });
        return;
      }
    }
  }
  next();
};

const checkInterestsExisted = (req: Request, res: Response, next: Function) => {
  if (req.body.interests) {
    for (let i = 0; i < req.body.interests.length; i++) {
      if (!INTERESTS.includes(req.body.interests[i])) {
        res.status(400).send({
          message: 'Interests does not exist',
        });
        return;
      }
    }
  }
};

export const verifySignUp = {
  checkDuplicatedUsernameOrEmail: checkDuplicatedUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkInterestsExisted: checkInterestsExisted,
};