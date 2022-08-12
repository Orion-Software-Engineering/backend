import {Request, Response} from 'express';
import Sequelize, {CreationOptional} from 'sequelize';
import events from '../models';
import config from '../config/auth.config';

const {Event} = events;

// Module for allowing users with moderator access to create events
export const createEvents = async (req: Request, res: Response) => {
    try {
        await Event.create( {
            event_name: req.body.name,
            event_date: req.body.date,
            event_time: req.body.event_time,
            venue: req.body.venue,
            organizers: req.body.organizers,
            MCs: req.body.mcs,
            Guests: req.body.guests,
            Age_restriction: req.body.age,
            description: req.body.description,
        })
    }

};

// Module for getting current events
export const getEvents = async (req: Request, res: Response) => {

};

// Module for deleting events
export const deleteEvents = async (req: Request, res: Response) => {

};
