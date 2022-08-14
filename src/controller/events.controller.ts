import {Request, Response} from 'express';
import Sequelize, {CreationOptional, UUID} from 'sequelize';
import events from '../models';
import config from '../config/auth.config';

const {Event} = events;

// Module for allowing users with moderator access to create events
export const createEvents = async (req: Request, res: Response) => {
  try {
    await Event.create({
      event_name: req.body.name,
      event_date: req.body.date,
      event_time: req.body.event_time,
      event_venue: req.body.venue,
      event_organizers: req.body.organizers,
      event_mcs: req.body.mcs,
      event_guests: req.body.guests,
      age_restriction: req.body.age,
      event_description: req.body.description,
      event_id: req.body.uuid,
    });
  } catch (e) {
    console.log('nothing to see here');
  }
};

// Module for getting current events
export const getEvents = async (req: Request, res: Response) => {};

// Module for deleting events
export const deleteEvents = async (req: Request, res: Response) => {};
