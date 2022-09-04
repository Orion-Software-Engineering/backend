// TODO: Implement

import Event from "../models/event/event.model";

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
    // const interests: string[] = (await event.getInterests()).map(interestObj => interestObj.name);
    // // @ts-ignore
    // event.setDataValue("interests", interests)
    // return event
}
