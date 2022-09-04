import {Request, Response} from "express";
import {eventMatch} from "../services/event.matching.service";
import db from "../models";

export const eventsMatchingController = async (req: Request, res: Response) => {
    const {id} = req.params;

    const events: object[] = [];

    const eventsAndPriorities = await eventMatch(id);

    if (eventsAndPriorities) {
        for (const [key, value] of eventsAndPriorities) {
            const event = await db.Event.findByPk(key);

            if (event) {
                events.push(event)
            }
        }
        return res.send(events)
    }
    return res.send("Couldn't do user matching");
}
