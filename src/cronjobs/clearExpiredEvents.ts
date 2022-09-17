import db from '../models'
const {Op} = require('sequelize')
//import today from 'Date'
import {getAllEvents} from "../controller/event.controller";
import expiredEvents from "../models/expiredEvents";
import {where} from "sequelize";

// const getEventIdsAndDates = async () => {
//     const events = await db.Event.findAll();
//     const eventIdAndDateMap = new Map<string, any>()
//
//     if (events){
//         events.forEach((event) => {
//             eventIdAndDateMap.set(event.id, event.date);
//         })
//
//         return eventIdAndDateMap
//     }
//
//     return "bad function"
// }

// We want to run a cronjob that clear expired events
export const clearExpiredEvents = async() => {
    const today = new Date();
    const events = await db.Event.findAll({
        where: {
            date: {
                [Op.lt]: today.toISOString().slice(0, 10)
            }
        }
    });

    if (events){
        for (const expired of events){
            await expiredEvents.create({
                id: expired.id,
                name: expired.name,
                description: expired.description,
                date: expired.date,
                time: expired.time,
                venue: expired.venue,
                location: expired.location,
                organizers: expired.organizers,
                mcs: expired.mcs,
                guests: expired.guests,
                age_restriction: expired.age_restriction,
                organizer: expired.organizer,
                cover_image: expired.cover_image,
            }).then(async() => {
                await db.Event.destroy({
                    where: {
                        date: {
                            [Op.lt]: today.toISOString().slice(0, 10)
                        }
                    }
                    }
                )
            })
        }

        return console.log("[+] Copied and moved all expired events.")
    }
    return console.log("[!] Did not find any expired events")

}
