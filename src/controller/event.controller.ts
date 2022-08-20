import {Request, Response} from 'express';
import db from '../models';
import Interest from "../models/interest";
import {Op, where} from "sequelize";

const {Event} = db;

// TODO: extract calls into service


// Module for allowing users with organizer access to create events
export const createEvent = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        console.log(req.file)
        const {
            name, description, date, time,
            venue, organizers, organizer,
            mcs, guests, age_restriction, interests
        } = req.body

        console.log(interests)
        // parse and store image locally
        // upload.single('cover-image')

        await Event.create({
            name: name,
            date: date,
            time: time,
            venue: venue,
            organizers: organizers,
            mcs: mcs,
            guests: guests,
            age_restriction: age_restriction,
            description: description,
            organizer: organizer,
        }).then(event => {
            Interest.findAll({
                where: {
                    name: {
                        [Op.or]: interests
                    }
                }
            }).then(interests => {
                event.setInterests(interests)
            })

            res.status(201).send(event);
        });
    } catch ({message}) {
        return res.status(400).send({message});
    }
};

// Module for getting current events
export const getEvent = async (req: Request, res: Response) => {
    const {id} = req.params;
    const event = await db.Event.findByPk(id);

    if (!event) return res.status(404).send('Event does not exist.');

    return res.status(200).send(event);
};

// Module for deleting events
export const deleteEvent = async (req: Request, res: Response) => {
    const {id} = req.params;
    const event = await db.Event.findByPk(id);

    if (!event) {
        return res.status(404).send({
            message: 'No such event',
        });
    }
    await event.destroy();
    return res.status(200).send({
        message: 'Event deleted successfully.',
    });
};

export const updateEvent = async (req: Request, res: Response) => {
    const {eventId} = req.params;

    try {
        await Event.findOne({
            where: {
                id: eventId,
            },
        }).then(newEvent => {
            if (newEvent) {
                newEvent.setInterests(req.body.interests)
                Event.update(
                    {
                        name: req.body.name,
                        description: req.body.description,
                        date: req.body.date,
                        venue: req.body.venue,
                        organizers: req.body.organizers,
                        mcs: req.body.mcs,
                        guests: req.body.guests,
                        age_restriction: req.body.age,
                    },
                    {
                        where: {
                            id: eventId,
                        },
                    }
                ).then(() => {
                    return res.status(201).send({
                        message: 'event updated successfully.',
                    });
                });
            } else {
                return res.status(403).send({
                    message: "event couldn't be updated.",
                });
            }
        });
    } catch ({message}) {
        res.status(400).send({message});
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const events = await Event.findAll()
        return res.status(200).send(events)
    } catch ({message}) {
        return res.status(400).send({message});
    }
}
