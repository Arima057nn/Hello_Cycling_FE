export interface BookingInterface {
  _id: string;
  userId: string;
  cyclingId: string;
  startStation: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TripHistoryInterface {
  _id: string;
  bookingId: BookingInterface;
  endStation: string;
  total: number;
  tripHistory: TripHistory[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  uid: string;
}

export interface TripHistory {
  latitude: string;
  longitude: string;
}
