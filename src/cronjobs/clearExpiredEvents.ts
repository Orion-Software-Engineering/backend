import db from '../models'
const {Op} = require('sequelize')
import expiredEvents from "../models/expiredEvents";

// We want to run a cronjob that will move expired events to another table
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
            await db.expiredEvents.create({
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
                cover_image: expired.cover_image
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
