import {Optional} from 'sequelize';

export type EventAttributes = {
<<<<<<< HEAD
    event_name: string;
    eventId: String;
    event_date: Date;
    event_time: Date;
    event_venue: string;
    event_organizers: string;
    event_mcs: string;
    event_guests: string;
    age_restriction: number;
    event_description: string;
};

export type EventCreationAttributes = Optional<
    EventAttributes,
    'eventId' | 'event_organizers'
    >;
=======
  event_name: string;
  event_date: Date;
  event_time: Date;
  event_venue: string;
  event_organizers: string;
  event_mcs: string;
  event_guests: string;
  age_restriction: number;
  event_description: string;
  event_id: string;
};

export type EventCreationAttributes = Optional<
  EventAttributes,
  'event_name' | 'event_organizers'
>;
>>>>>>> 7e5131444f200b9ecb33df3bbae87310a2fb0813
