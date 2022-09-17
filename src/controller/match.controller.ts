import {Request, Response} from 'express';
import matchService from '../services/match.service';
import {sortByLocation} from "../services/location.matching.service";

export const find = async (req: Request, res: Response) => {
    try {
        const result = await matchService.findMatches(req.params.id);
        res.status(200).send(result);
    } catch ({message}) {
        console.log(message)
        return res.status(400).send('Unable to find matches.')
    }
}

export const findWithLocation = async (req: Request, res: Response) => {
    try {

        const data: any = await sortByLocation(req.params.id)

        // converted to object to allow response to send map
        return res.status(200).send(Object.fromEntries(data))
    } catch ({message}) {
        console.log(message)
        return res.status(400).send()
    }
}
