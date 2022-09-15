import db from '../models'
import {getAllEvents} from "../controller/event.controller";

// We want to run a cronjob that clear expired events
export const clearExpiredEvents = async() => {

    try {
        const allEvents = await db.Event.findAll()

    } catch (e) {

    }

}
