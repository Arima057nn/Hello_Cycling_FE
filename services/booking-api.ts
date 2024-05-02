import { axiosClient } from "./axios-cilent";

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
  findTrip(userId: string) {
    return axiosClient.get(`/booking/findTrip/?userId=${userId}`);
  },
};
