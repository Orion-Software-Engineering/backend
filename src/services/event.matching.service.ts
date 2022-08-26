import db from '../models';
import Interest from "../models/interest";
// import {sequelize} from '..';
import Event from "../models/event";

export const getAllEventIds = async () => {
    const events =  await db.Event.findAll({
        include: [{
            model: db.Interest,
        }],
        attributes: ['id'],
    });
     if (events){
         console.log(events.keys())
     }
};

export const eventMatch = async (userId: string) => {
    const user = await db.User.findByPk(userId);

    if (user){
        let userInterests = await user.getInterests()

        const eventsInterestsAndIds = getAllEventIds();
    }
};
