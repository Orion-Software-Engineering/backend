// TODO: Implement

import {EventAttributes} from "../models/event";
import Event from "../models/event/event.model";
import User from "../models/user";
import db from "../models";

export const generateEventWithInterests = async (event: Event) => {
    const interests: string[] = (await event.getInterests()).map(interestObj => interestObj.name);
    // @ts-ignore
    event.setDataValue("interests", interests)
    return event
}

export const generateEventsWithInterests = async (events: Event[]) => {
    let eventsWithInterests: Event[] = []
    for (const event of events)
        eventsWithInterests.push(await generateEventWithInterests(event))

    return eventsWithInterests
}

export const generateEventWithExtraData = async (event: Event, user: User) => {
    const ev = await generateEventWithInterests(event)
    const pureUser = await db.User.findByPk(user.id)
    if (!pureUser) return ev
    const likedEvents = await pureUser.getLikedEvents()
    let liked = false
    likedEvents.forEach(lv => {
        if (lv.id === event.id) liked = true
    })
    // @ts-ignore
    ev.setDataValue("liked", liked)
    return ev
}

export const generateEventsWithExtraData = async (events: Event[], user: User) => {
    let eventsWithExtraData: Event[] = []
    for (const event of events)
        eventsWithExtraData.push(await generateEventWithExtraData(event, user))

    return eventsWithExtraData
}

