import {Request, Response} from "express";
import {eventMatch} from "../services/event.matching.service";
import db from "../models";
import {generateEventsWithExtraData, generateEventWithInterests} from "../services/event.service";
import Event from "../models/event";

export const eventsMatchingController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const user = await db.User.findByPk(id)
        const events: object[] = [];
        if (!user) return res.status(404).send()

        const eventsAndPriorities = await eventMatch(id);

        if (eventsAndPriorities) {
            for (const [key, value] of eventsAndPriorities) {
                const event = await db.Event.findByPk(key);

                if (event) {
                    events.push(await generateEventWithInterests(event))
                }
            }
            return res.send(await generateEventsWithExtraData((events as Event[]), user))
        }
    } catch ({message}) {
        return res.status(400).send({message})
    }
}
