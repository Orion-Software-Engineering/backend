import {Request,Response} from "express";
import {eventMatch} from "../services/event.matching.service";

export const  eventsMatchingController = async (req: Request, res: Response) => {
    const {id} = req.params;

    await eventMatch(id);
}
