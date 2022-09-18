import db from '../models'
import Sequelize from 'sequelize';

const {Like} = db

const like = async (eventID: string, userID: string) => {
    const user = await db.User.findByPk(userID)
    const event = await db.Event.findByPk(eventID)

    if (user && event){
        const alreadyLiked = await db.Like.findByPk(eventID+userID)
        // one user can like an event only once
        if(!alreadyLiked){
            await Like.create({
                eventId: eventID,
                userId: userID,
                like: true
            })
            return "Event successfully liked."
        }
        return "User has already liked event."
    }
    return "Invalid User or Event ID."
}

const dislike = async (eventID: string, userID: string) => {
    const user = await db.User.findByPk(userID)
    const event = await db.Event.findByPk(eventID)

    if (user && event){
        const alreadyLiked = await db.Like.findByPk(eventID+userID)
        // one user can like an event only once
        if(!alreadyLiked){
            await Like.create({
                eventId: eventID,
                userId: userID,
                like: false
            })
            return "Event successfully unliked."
        }
        return "User has already unliked event."
    }
    return "Invalid User or Event ID."
}

const getLikes = async (eventID: string) => {
    const event = Like.count({
        where: {
            eventId: eventID,
            like: true
        }
    })

    if (event){
        return event
    }
    return "Event does not exist."

}

export default {
    like, dislike,
    getLikes
}
