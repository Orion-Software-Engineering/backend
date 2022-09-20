import {Request, Response} from 'express'
import db from '../models'
import eventLikeService from "../services/event.like.service";

const likeEvent = async (req: Request, res: Response) => {
    const {eventId, userId} = req.body

    try {
        return  res.status(201).send(await eventLikeService.like(eventId, userId))
    } catch ({message}) {
        return res.status(400).send({message})
    }

}

const unlikeEvent = async (req: Request, res: Response) => {
    const {eventId, userId} = req.body

    try{
       return res.json(await eventLikeService.unlike(eventId, userId))
    }catch ({message}) {
        return res.status(400).send({message})
    }
}

const getEventLikes = async (req: Request, res: Response) => {
    const {id} = req.params

    const [numberOfLikes, eventID] = await eventLikeService.getLikes(id)

    try {
        console.log(eventID,numberOfLikes)
        return res.status(200).json({
            eventId: eventID,
            likes : numberOfLikes
        })
    } catch ({message}) {
        return  res.status(400).send({message})
    }
}

export default {
    likeEvent, unlikeEvent, getEventLikes
}

