import { axiosClient } from "./axios-cilent";

export const bookingApi = {
  createBooking(
    cyclingId: string,
    startStation: string,
  ) {
    return axiosClient.post(`/booking/create`, {
      cyclingId,
      startStation,
    });
  },
  createTripDetail(bookingId: string, endStation: string, status: number) {
    return axiosClient.post(`/booking/tripDetail`, {
      bookingId,
      endStation,
      status,
    });
  },
  getTripDetail(bookingId: string) {
    return axiosClient.get(`/booking/tripDetail/?bookingId=${bookingId}`);
  },
  findTrip() {
    return axiosClient.get(`/booking/findTrip/`);
  },
};
