import {Request, Response} from 'express';
import Sequelize, {CreationOptional, UUID} from 'sequelize';
import events from '../models';
import config from '../config/auth.config';
import db from '../models';

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
    }).then(event => {
      Event.findAll({
        where: {
          event_name: req.body.name,
        },
      });
      return res.status(201).send({
        message: 'Event added successfully!',
        eventId: event.eventId,
      });
    });
  } catch ({message}) {
    res.status(500).send({message});
  }
};

// Module for getting current events
export const getEvents = async (req: Request, res: Response) => {
  const {id} = req.params;
  const event = await db.Event.findByPk(id);

  if (!event) {
    return res.status(404).send('Event does not exist.');
  }

  return res.status(200).send({
    event_name: event.event_name,
    event_Id: event.eventId,
    event_date: event.event_date,
    event_time: event.event_time,
    event_venue: event.event_venue,
    event_organizers: event.event_organizers,
    event_mcs: event.event_mcs,
    event_guests: event.event_guests,
    age_restriction: event.age_restriction,
    event_description: event.event_description,
  });
};

// Module for deleting events
export const deleteEvents = async (req: Request, res: Response) => {
  const {id} = req.params;
  const event = await db.Event.findByPk(id);

  if (!event) {
    return res.status(404).send({
      message: 'No such event',
    });
  }

  if (event) {
    res.status(200).send({
      message: 'Event deleted successfully.',
    });
    return await event.destroy();
  }
};
