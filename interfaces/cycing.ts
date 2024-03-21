interface CycingInterface {
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

export interface CycingAtStationInterface {
  count: number;
  _id: string;
  stationId: string;
  cycingId: CycingInterface;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
