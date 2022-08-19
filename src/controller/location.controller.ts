import {Request, Response} from 'express'
import {getLocation} from "../services/location.service";

export const getUserLocation = async (req: Request, res: Response) => {
    const location = await getLocation(req.params.userId)
    if (!location) {
        return res.status(404).send()
    }
    const split = location.split(' ')
    const latitude = split[0]
    const longitude = split[1]

    return res.status(200).json({
        "latitude": latitude,
        "longitude": longitude
    })
}

export const updateUserLocation = (req: Request, res: Response) => {

}
