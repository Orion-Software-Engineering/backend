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
         return events.map((events) => events.getDataValue("id"));
     }
};

export const eventMatch = async (userId: string) => {
    const user = await db.User.findByPk(userId);

    if (user){
        let userInterests = await user.getInterests();

        const eventIds = getAllEventIds();

        for(let i in eventIds){
            const eventModel = await db.Event.findByPk(eventIds[i]);
            if (eventModel){
                let eventInterests = await eventModel.getInterests();

                for(let i in userInterests){
                    if (eventInterests.includes(userInterests[i])){

                    }
                }
            }
        }
    }
};
