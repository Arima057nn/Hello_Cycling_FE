interface CyclingInterface {
  _id: string;
  name: string;
  code: string;
  password: string;
  status: number;
  category: number;
  createdAt: string;
  updatedAt: string;
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
