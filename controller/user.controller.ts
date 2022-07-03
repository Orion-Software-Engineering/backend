import {Request, Response} from "express";

exports.allAccess = (req: Request, res: Response) => {
    res.status(200).send("Public Content")
}

exports.userBoard = (req: Request, res: Response) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req: Request, res: Response) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req: Request, res: Response) => {
    res.status(200).send("Moderator Content.");
};