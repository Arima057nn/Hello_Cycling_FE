import { CyclingInterface } from "./cycling";

export interface StationInterface {
  _id: string;
  name: string;
  code: string;
  position: string;
  latitude: number;
  longitude: number;
  imgae: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StationCountInterface {
  count: number;
  station: StationInterface;
}

export interface StationCountAndDistanceInterface {
  station: StationInterface;
  distance: string;
  value: number;
  duration: string;
  countOfCycling: number;
}

export interface CyclingStationInterface {
  _id: string;
  stationId: StationInterface;
  cyclingId: CyclingInterface;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
