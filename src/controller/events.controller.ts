import {Request, Response} from 'express';
import Sequelize, {CreationOptional, UUID} from 'sequelize';
import events from '../models';
import config from '../config/auth.config';
import db from "../models";

const {Event} = events;

// Module for allowing users with moderator access to create events
export const createEvents = async (req: Request, res: Response) => {
<<<<<<< HEAD
    try {
        await Event.create( {
            event_name: req.body.event_name,
            event_date: req.body.date,
            event_time: req.body.event_time,
            venue: req.body.venue,
            organizers: req.body.organizers,
            MCs: req.body.mcs,
            Guests: req.body.guests,
            Age_restriction: req.body.age,
            description: req.body.description,
        }).then ({
            res.send()
        });
    } catch ({message}) {
        res.status(500).send({message})
    }

};

// Module for getting current events
export const getEvents = async (req: Request, res: Response) => {
    const event = await db.Event.findByPk(req.body.eventId);

    if (!event){
        return res.status(404).send("Event does not exist.");
    }

    return res.status(200).send({

    });

};
=======
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
>>>>>>> 7e5131444f200b9ecb33df3bbae87310a2fb0813

// Module for deleting events
export const deleteEvents = async (req: Request, res: Response) => {};
