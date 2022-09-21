import db from '../models'
const {Op} = require('sequelize')
import expiredEvents from "../models/expired_events";
import exp from "constants";
import {logger} from "../logger/logger";

// We want to run a cronjob that will move expired events to another table
export const clearExpiredEvents = async() => {

    logger.info("Cronjob: Moving expired events to to another table")
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
            await db.ExpiredEvent.create({
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
                ticket_price: expired.ticket_price,
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

        return logger.info("Moved all expired events to expired_events table")
    }
    return logger.info("Did not find any expired events")
}
