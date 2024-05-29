import { CyclingInterface } from "./cycling";
import { StationInterface } from "./station";
import { TicketInterface } from "./ticket";

export interface BookingInterface {
  _id: string;
  userId: string;
  cyclingId: string;
  startStation: string;
  ticketId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TripInterface {
  _id: string;
  userId: string;
  cyclingId: CyclingInterface;
  startStation: StationInterface;
  ticketId: TicketInterface;
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
  payment: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  uid: string;
}

export interface TripDetailInterface {
  _id: string;
  bookingId: TripInterface;
  endStation: StationInterface;
  total: number;
  tripHistory: TripHistory[];
  payment: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  uid: string;
}

export interface TripHistory {
  latitude: number;
  longitude: number;
}

export interface BookingOnKeepingInterface {
  _id: string;
  userId: string;
  cyclingId: CyclingInterface;
  startStation: StationInterface;
  status: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
