import { axiosClient } from "./axios-cilent";
import { CoordinateInterface } from "@/interfaces/coordinate";

export const bookingApi = {
  createBooking(
    userId: string,
    cyclingId: string,
    startStation: string,
    status: number
  ) {
    return axiosClient.post(`/booking/create`, {
      userId,
      cyclingId,
      startStation,
      status,
    });
  },
  createTripDetail(
    bookingId: string,
    endStation: string,
    status: number,
    tripHistory: CoordinateInterface[]
  ) {
    return axiosClient.post(`/booking/tripDetail`, {
      bookingId,
      endStation,
      status,
      tripHistory,
    });
  },
  getTripDetail(bookingId: string) {
    return axiosClient.get(`/booking/tripDetail/?bookingId=${bookingId}`);
  },
};
