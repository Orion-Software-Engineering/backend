import db from '../models';
import Interest from "../models/interest";
// import {sequelize} from '..';
import Event from "../models/event";

export const getAllEventIds = async () => {
    const event =  await db.Event.findAll({
        attributes: ['id']
    });
     if (event){
         return event;
     }

};
