import db from '../models'
import Sequelize, {where} from 'sequelize';

const {User} = db

const like = async (eventId: string, userId: string) => {
    /**
     * This function likes an event for a user
     */
    const user = await User.findByPk(userId)
    const event = await db.Event.findByPk(eventId)
    if (!user || !event) return "we got a problem"

    const userLikedEvents = await user.getLikedEvents()
    console.log(userLikedEvents)

    return await user.addLikedEvents([eventId])
}

const dislike = async (eventID: string, userID: string) => {
    // simply remove the event from the user, i decided to leave this for you
    return "Invalid User or Event ID."
}

const getLikes = async (eventID: string) => {
    // const event = Like.count({
    //     where: {
    //         eventId: eventID,
    //         like: true
    //     }
    // })
    //
    // if (event){
    //     return event
    // }
    return 'hello'
}

export default {
    like, dislike,
    getLikes
}
