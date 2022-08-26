import db from '../models';
import Interest from "../models/interest";
// import {sequelize} from '..';
import Event from "../models/event";

export const getAllEventIds = async () => {
    const event =  await db.Event.findAll({
        include: [{
            model: Interest,
        }],
        attributes: ['id','interest']
    });
     if (event){
         console.log(event);
     }
};

export const eventMatch = async (userId: string) => {
    const user = await db.User.findByPk(userId);

    if (user){
        let userInterests = await user.getInterests()

        const eventsInterestsAndIds = getAllEventIds();
    }
};
