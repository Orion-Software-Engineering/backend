import db from '../models'
import {Request, Response} from "express";

const getAllEventIds = async () => {
    // fetch all events and their interests
    const events = await db.Event.findAll({
        attributes: ['id'],
    });
    if (events) {
        return events.map((event) => event.id);
    }
};

export const eventMatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await db.User.findByPk(id);

    let priority = 0;

    let userInterestsArray: string[] = [];
    let eventInterestsArray: string[] = [];
    if (user) {
        let userInterests = await user.getInterests();

        userInterests.forEach(userInt => {
            userInterestsArray.push(userInt.name)
        })

        const eventIds = await getAllEventIds();
        if (eventIds) {
            for (const eventId of eventIds) {
                const eventModel = await db.Event.findByPk(eventId);
                if (eventModel) {
                    let eventInterests = await eventModel.getInterests();
                    eventInterests.forEach(eveInt => {
                        eventInterestsArray.push(eveInt.name)
                    });

                    // for (let i in userInterestsArray) {
                    //     if (eventInterestsArray.includes(i)) {
                    //         priority += 1;
                    //     }
                    // }
                    userInterestsArray.forEach(userInterest => {
                        if (eventInterestsArray.includes(userInterest))
                            priority++
                    })
                    res.send(eventId + ': ' + priority);
                }
            }
        }
    }

};
