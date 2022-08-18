import {Request, Response} from 'express';
import matchService from '../services/match.service';

export const find = async (req: Request, res: Response) => {
  const result = await matchService.findMatches(req.params.id);
  res.status(200).send({data: result});
};
