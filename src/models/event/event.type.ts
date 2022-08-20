import {Optional} from 'sequelize';

export type Attributes = {
  id: string;
  name: string;
  description: string;
  date: Date;
  venue: string;
  organizers: string;
  mcs: string;
  guests: string;
  age_restriction: number;
};

export type CreationAttributes = Optional<Attributes, 'id' | 'guests' | 'mcs'>;
