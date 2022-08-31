import {Request, Response} from 'express';
import db from '../models';
import {Op} from "sequelize";


const {Event, Interest} = db;

// TODO: extract calls into service


// Module for allowing users with organizer access to create events
export const createEvent = async (req: Request, res: Response) => {
        // let cover_image_url: string = ''
        try {
            //     console.log(req.file)
            //     if (req.file) {
            //         try {
            //             const file = dataUri(req)?.content
            //             if (file) {
            //                 const uploadedImage = await uploadImageToCloudinary(file)
            //                 console.log(uploadedImage)
            //                 cover_image_url = uploadedImage.secure_url
            //             }
            //         } catch ({message}) {
            //             return res.status(500).send('Error uploading to cloudinary')
            //         }
            //     }
            //
            //     if (!cover_image_url) return res.status(400).send("No image found")

            const {
                name, description, date, time,
                venue, organizers, organizer,
                mcs, guests, age_restriction,
                interests, cover_image
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
                cover_image: cover_image
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
        } catch
            ({message}) {
            return res.status(400).send({message});
        }
    }
;

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
    const {id} = req.params;
    // let cover_image_url: string = ''
    // if (req.file) {
    //     const file = dataUri(req)?.content
    //     if (file) {
    //         const uploadedImage = await uploadImageToCloudinary(file)
    //         console.log(uploadedImage)
    //         cover_image_url = uploadedImage.secure_url
    //     }
    // }

    // if (!cover_image_url) return res.status(400).send('No image found')

    const {
        name, description, date, time,
        venue, organizers, organizer,
        mcs, guests, age_restriction,
        interests, cover_image
    } = req.body

    console.log(interests)

    try {
        await Event.findOne({
            where: {
                id: id,
            },
        }).then(newEvent => {
            if (newEvent) {
                newEvent.update(
                    {
                        name: name,
                        description: description,
                        date: date,
                        venue: venue,
                        organizers: organizers,
                        mcs: mcs,
                        guests: guests,
                        age_restriction: age_restriction,
                        time: time,
                        cover_image: cover_image,
                        organizer: organizer
                    }
                ).then(() => {
                    Interest.findAll({
                        where: {
                            name: {
                                [Op.or]: interests
                            }
                        }
                    }).then(interests => {
                        newEvent.setInterests(interests)
                    })

                    return res.status(201).send(newEvent);
                });
            } else {
                return res.status(400).send({
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
