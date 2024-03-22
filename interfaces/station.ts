export interface StationInterface {
  _id: string;
  name: string;
  code: string;
  position: string;
  latitude: string;
  longitude: string;
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
  duration: string;
  countOfCycling: number;
}
