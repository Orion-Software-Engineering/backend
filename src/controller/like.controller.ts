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

const dislikeEvent = async (req: Request, res: Response) => {
    const {eventId, userId} = req.body

    try{
       return res.status(201).send(await eventLikeService.dislike(eventId, userId))
    }catch ({message}) {
        return res.status(400).send({message})
    }
}

const getEventLikes = async (req: Request, res: Response) => {
    const {eventId} = req.body

    try {
        return res.status(200).send(await eventLikeService.getLikes(eventId))
    } catch ({message}) {
        return  res.status(400).send({message})
    }
}

export default {
    likeEvent, dislikeEvent, getEventLikes
}

