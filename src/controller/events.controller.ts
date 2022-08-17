import {Request, Response} from 'express';
import Sequelize, {CreationOptional} from 'sequelize';
import events from '../models';
import config from '../config/auth.config';
import db from "../models";

const {Event} = events;

// Module for allowing users with moderator access to create events
export const createEvents = async (req: Request, res: Response) => {
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
        })
    } catch ({message}) {
        res.status(500).send({message})
    }

};

// Module for getting current events
export const getEvents = async (req: Request, res: Response) => {
    const event = await db.Event.findByPk(req.body.event_name);

    if (!event){
        return res.status(404).send("Event does not exist.")
    }

    const validEvents = await db.Event.findAll({
        where: {
            event_name: req.body.event_name,
        },
    })

};

// Module for deleting events
export const deleteEvents = async (req: Request, res: Response) => {

};
