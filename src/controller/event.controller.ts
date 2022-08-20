import {Request, Response} from 'express';
import db from '../models';
import multer from 'multer'

const {Event} = db;

// TODO: extract calls into service

const storage = multer.diskStorage({
    destination: __dirname + '/images/',
    filename(req: Request,
             file: Express.Multer.File,
             callback: (error: (Error | null), filename: string) => void) {
        console.log(callback)
        callback(null, `${file.originalname}-${new Date()}`)
    }
})

const upload = multer({storage})
// Module for allowing users with organizer access to create events
export const createEvent = async (req: Request, res: Response) => {
    try {
        // parse and store image locally
        upload.single('file')

        await Event.create({
            name: req.body.name,
            date: req.body.date,
            venue: req.body.venue,
            organizers: req.body.organizers,
            mcs: req.body.mcs,
            guests: req.body.guests,
            age_restriction: req.body.age,
            description: req.body.description,
            organizer: req.body.organizer
        }).then(event => {
            event.setInterests(req.body.interests)

            return res.status(201).send({
                message: 'Event created successfully!',
                eventId: event.id,
            });
        });
    } catch ({message}) {
        res.status(400).send({message});
    }
};

// Module for getting current events
export const getEvent = async (req: Request, res: Response) => {
    const {id} = req.params;
    const event = await db.Event.findByPk(id);

    if (!event) return res.status(404).send('Event does not exist.');

    return res.status(200).send({event});
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

    res.status(200).send({
        message: 'Event deleted successfully.',
    });
    return await event.destroy();
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
