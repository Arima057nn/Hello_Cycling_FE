import { axiosClient } from "./axios-cilent";
import { CoordinateInterface } from "@/interfaces/coordinate";

export const bookingApi = {
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
};
