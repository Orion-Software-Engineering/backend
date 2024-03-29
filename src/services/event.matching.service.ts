import db from '../models'
import {Request, Response} from "express";

const getAllEventIds = async () => {
    // fetch all events and their interests
    const events = await db.Event.findAll({
        attributes: ['id'],
    });
    if (events) {
        return events.map((event) => event.id);
    }
};

export const eventMatch = async (id: string) => {
    // const {id} = req.params;
    const user = await db.User.findByPk(id);

    let priority = 0;

    const userEventPriorityMap = new Map<string, number>()

    let userInterestsArray: string[] = [];
    let eventInterestsArray: string[] = [];
    if (user) {
        let userInterests = await user.getInterests();

        userInterests.forEach(userInt => {
            userInterestsArray.push(userInt.name)
        })

        const eventIds = await getAllEventIds();
        if (eventIds) {
            for (const eventId of eventIds) {
                priority = 0
                const eventModel = await db.Event.findByPk(eventId);
                if (eventModel) {
                    let eventInterests = await eventModel.getInterests();
                    eventInterests.forEach(eveInt => {
                        eventInterestsArray.push(eveInt.name)
                    });

                    userInterestsArray.forEach(userInterest => {
                        if (eventInterestsArray.includes(userInterest))
                            priority++
                    })
                }
                if (priority>0){
                    userEventPriorityMap.set(eventId, priority);
                }
                eventInterestsArray.splice(0);
            }
        }
    }

    // Sorting  the events in terms of their priority (highest to lowest)
    const sortedEvents = new Map([...userEventPriorityMap].sort((a, b) => b[1] - a[1]));

    return sortedEvents
};
