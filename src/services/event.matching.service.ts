import db from '../models'
import {Request, Response} from "express";

const getAllEventIds = async () => {
    // fetch all events and their interests
    const events = await db.Event.findAll({
        attributes: ['id'],
    });
    if (events) {
        // console.log(events)
        // events.forEach(event => {
        //     console.log(event)
        //
        return events.map((event) => event.id);

    }
};

export const eventMatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await db.User.findByPk(id);

    let priority = 0;

    let userInterestsArray = [];
    let eventInterestsArray = [];

    if (user) {
        let userInterests = await user.getInterests();

        console.log(userInterests);

        const eventIds = await getAllEventIds();
        if (eventIds) {
            for (const eventId of eventIds) {
                const eventModel = await db.Event.findByPk(eventId);
                if (eventModel) {
                    let eventInterests = await eventModel.getInterests();
                    for (let i in userInterests) {
                        if (eventInterests.includes(userInterests[i])) {
                            priority += 1;
                        } else {
                            continue
                        }

                    }
                    res.send(eventId + ': ' + priority);
                }
            }
        }
    }

    // for(let i in eventIds){
    //     // const eventModel = await db.Event.findByPk(eventIds[i]);
    //     if (eventModel){
    //         let eventInterests = await eventModel.getInterests();
    //
    //         for(let i in userInterests){
    //             if (eventInterests.includes(userInterests[i])){
    //                 priority += 1;
    //             }
    //             else {
    //                 continue
    //             }
    //
    //         console.log(eventIds[i] + ':' + priority);
    //         }
    //
    //         // okay sure
    //     }
    // }
    // }
};
