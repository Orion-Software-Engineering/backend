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

const unlike = async (eventId: string, userId: string) => {
    // simply remove the event from the user, i decided to leave this for you
    const event = await db.Event.findByPk(eventId)
    const user = await  db.User.findByPk(userId)

    if (!user || !event) return "Invalid userId or eventId"

    return  await user.removeLikedEvents([eventId])

}

const getLikes = async (eventId: string) => {
    const user = await db.User.count(
        {
        include: [{
            model: db.Event,
            as: 'likedEvents',
            where: {
                id: eventId
            },
        }],
    })
    console.log(user)
    if (user){
        return [user, eventId]
    }
    return "No such event."
}

export default {
    like, unlike,
    getLikes
}
