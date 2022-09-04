// TODO: Implement

import Event from "../models/event/event.model";

export const generateEventWithInterests = async (event: Event) => {
    const interests: string[] = (await event.getInterests()).map(interestObj => interestObj.name);
    // @ts-ignore
    event.setDataValue("interests", interests)

    return event
}
