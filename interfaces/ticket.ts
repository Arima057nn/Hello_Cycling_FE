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
  createdAt: string;
  updatedAt: string;
  __v: number;
}
