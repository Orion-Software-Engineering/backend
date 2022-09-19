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
        const list: object[] = []
        const data  = await sortByLocation(req.params.id)

        function sortFunction(a:any, b:any ) {
            if (a[3] === b[3]) {
                return 0;
            }
            else {
                return (a[3] < b[3]) ? -1 : 1;
            }
        }

        if (data){
            for (const i of data){
               list.push(i)
            }

        }
        // converted to object to allow response to send map
        console.log(data)
        return res.status(200).send(list.sort(sortFunction))
    } catch ({message}) {
        return res.status(400).send({message})
    }
}

