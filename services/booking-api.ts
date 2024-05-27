import { axiosClient } from "./axios-cilent";

export const bookingApi = {
  createBooking(cyclingId: string, startStation: string, ticketId: string) {
    return axiosClient.post(`/booking/create`, {
      cyclingId,
      startStation,
      ticketId,
    });
  },
  createTripDetail(bookingId: string, endStation: string) {
    return axiosClient.post(`/booking/tripDetail`, {
      bookingId,
      endStation,
    });
  },
  getTripDetail(bookingId: string) {
    return axiosClient.get(`/booking/tripDetail/?bookingId=${bookingId}`);
  },
  findTrip() {
    return axiosClient.get(`/booking/findTrip/`);
  },
  findTripById(bookingId: string) {
    return axiosClient.get(`/booking/findTripById/?bookingId=${bookingId}`);
  },
  getTripHistory() {
    return axiosClient.get(`/booking/history`);
  },
  createKeeping(cyclingId: string, startStation: string, ticketId: string) {
    return axiosClient.post(`/booking/createKeep`, {
      cyclingId,
      startStation,
      ticketId,
    });
  },
  cancelKeeping(bookingId: string, category: string) {
    return axiosClient.post(`/booking/cancel`, { bookingId, category });
  },
  startFromKeeping(bookingId: string) {
    return axiosClient.post(`/booking/start`, { bookingId });
  },
  getTripsCurrent() {
    return axiosClient.get(`/booking/trips`);
  },
};
