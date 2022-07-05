import { Request, Response } from "express";

export const verified = (req: Request, res: Response) => {
    res.status(200).send('Account verified');
}