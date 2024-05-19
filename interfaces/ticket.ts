import { CyclingTypeInterface } from "./cycling";

export interface TicketInterface {
  _id: string;
  name: string;
  description: string;
  price: number;
  overduePrice: number;
  timer: number;
  duration: number;
  categoryId: CyclingTypeInterface;
  expiration: number;
  condition: number;
  type: TicketTypeInterface;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TicketTypeInterface {
  _id: string;
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserTicketInterface {
  _id: string;
  userId: string;
  ticketId: TicketInterface;
  status: number;
  usage: number;
  dateEnd: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
