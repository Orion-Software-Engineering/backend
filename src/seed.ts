// eslint-disable-next-line node/no-unpublished-import
import {faker} from '@faker-js/faker';
import {randomInt} from 'crypto';
import {Request, Response} from 'express';
import db from './models';
import {signup} from './controller/auth.controller';
import interest from './services/interest.service';

const seedUsersWithInterests = async (num: number) => {
  for (let i = 0; i < num; i++) {
    await seedUsersWithInterest();
  }
};

const seedUsersWithInterest = async () => {
  const requestMock = {
    body: {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      dob: faker.date.birthdate(),
    },
  };
  let user = '';
  const responseMock = {
    status: (_: number) => {
      const send = (obj: {userId: string}) => {
        user = obj.userId;
        return _;
      };

      return {send};
    },
  };

  await signup(
    requestMock as unknown as Request,
    responseMock as unknown as Response
  );

  await interest.set(user, getRandomInterests(4));
};

const getRandomInterests = (n: number) => {
  const interests = [];
  for (let i = 0; i <= n; i++) {
    interests.push(db.INTERESTS[randomInt(db.INTERESTS.length)]);
  }

  return interests;
};

export {seedUsersWithInterests};
