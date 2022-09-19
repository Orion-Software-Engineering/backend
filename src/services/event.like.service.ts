import db from '../models'
import Sequelize, {where} from 'sequelize';

const {User} = db

const like = async (eventId: string, userId: string) => {
    const validUser = await User.findByPk(userId)
    // const validEvent = await db.Event.findByPk(eventId)

    if (!validUser) {
        // user does not exist, return
        return
    }
    console.log(validUser)
    const userLikedEvents = await validUser.getLikedEvents()
    console.log(userLikedEvents)

    let alreadyLikedFlag = false  // this flag tells us if the event has already been liked or not

    userLikedEvents.forEach(event => {
        if (event.id === eventId) alreadyLikedFlag = true
    })

    if (alreadyLikedFlag) {
        // already liked, do something
        return
    }

    return await validUser.addLikedEvents([eventId])

    // if (!userLiked && validUser && validEvent){
    //     await validUser?.addLikedEvent([eventId])
    //
    //     return "Like added successfully."
    // }
    // else if (userLiked && validUser && validEvent){
    //     return "You have already like the event."
    // }
    //
    // else if (!validUser || !validEvent){
    //     return "User Id or Event Id does not exist."
    // }
}

const dislike = async (eventID: string, userID: string) => {
    // const user = await db.User.findByPk(userID)
    // const event = await db.Event.findByPk(eventID)
    //
    // if (user && event){
    //     const alreadyLiked = await db.Like.findByPk(eventID+userID)
    //     // one user can like an event only once
    //     if(!alreadyLiked){
    //         await Like.create({
    //             eventId: eventID,
    //             userId: userID,
    //             like: false
    //         })
    //         return "Event successfully unliked."
    //     }
    //     return "User has already unliked event."
    //}
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
