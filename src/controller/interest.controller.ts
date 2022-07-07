import {Request, Response} from 'express';
import interest from '../services/interest.service';

const get = async (req: Request, res: Response) => {
    try {
        res.json(await interest.get(req.params.id));
    } catch ({message}) {
        // TODO: we should decide on a standard way to do error handling
        res.status(400).send({message});
    }
};

const set = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {interests}: { interests: string[] } = req.body;
        res.json(await interest.set(id, interests));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

const remove = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {interests}: { interests: string[] } = req.body;
        res.json(await interest.remove(id, interests));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

const add = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {interests}: { interests: string[] } = req.body;
        res.json(await interest.add(id, interests));
    } catch ({message}) {
        res.status(400).send({message});
    }
};

export default {
    get,
    add,
    remove,
    set,
};
