import {Request, Response} from 'express'
import {getLocation, updateLocation} from "../services/location.service";

export const getUserLocation = async (req: Request, res: Response) => {
    try {
        const location = await getLocation(req.params.userId)
        const split = location.split(' ')
        const latitude = split[0]
        const longitude = split[1]

        return res.status(200).json({
            "latitude": latitude,
            "longitude": longitude
        })
    } catch ({message}) {
        return res.status(400).send({message})
    }

}

export const updateUserLocation = async (req: Request, res: Response) => {
    try {
        const {userId, latitude, longitude} = req.body
        const update = await updateLocation(userId, latitude, longitude)
        return res.status(update).send()
    } catch ({message}) {
        return res.status(400).send({message})
    }

}
