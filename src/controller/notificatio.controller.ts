import {Request, Response} from 'express'
import {sendNotification} from "../services/notification.service";

export const makeNotification = async (req:Request,res:Response) => {
    try{
        res.send("Message sent!")
        return await sendNotification("Frank what's up")
    }
    catch ({message}){
        res.send({message})
    }
}

