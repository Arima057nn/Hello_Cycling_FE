import { CoordinateInterface } from "./coordinate";

export interface CyclingInterface {
  _id: string;
  name: string;
  code: string;
  password: string;
  status: number;
  category: CyclingTypeInterface;
  createdAt: string;
  updatedAt: string;
  latitude: number;
  longitude: number;
  coordinate: CoordinateInterface[];
  __v: number;
}

export interface CyclingAtStationInterface {
  count: number;
  _id: string;
  stationId: string;
  cyclingId: CyclingInterface;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CyclingTypeInterface {
  _id: string;
  name: string;
  description: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
