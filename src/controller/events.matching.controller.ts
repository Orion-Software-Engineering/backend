import {Request, Response} from "express";
import {eventMatch} from "../services/event.matching.service";
import db from "../models";
import {generateEventWithInterests} from "../services/event.service";

export const eventsMatchingController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const events: object[] = [];

        const eventsAndPriorities = await eventMatch(id);

        if (eventsAndPriorities) {
            for (const [key, value] of eventsAndPriorities) {
                const event = await db.Event.findByPk(key);

                if (event) {
                    events.push(generateEventWithInterests(event))
                }
            }
            return res.send(events)
        }
    } catch ({message}) {
        return res.send({message});
    }
}
