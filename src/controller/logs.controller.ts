import {Request, Response} from "express";
import path from "path";

const download = async(req: Request, res: Response) => {
    try{
        res.sendFile(path.resolve( 'logs', 'backend.log'))

    }catch ({message}) {
        res.send({message})
    }
}

export default {
    download
}
