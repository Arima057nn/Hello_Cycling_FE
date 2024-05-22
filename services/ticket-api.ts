import { axiosClient } from "./axios-cilent";

export const ticketApi = {
  getTickets() {
    return axiosClient.get(`/ticket/`);
  },
  getMyTickets() {
    return axiosClient.get(`/ticket/myTicket`);
  },
  buyTicket(ticketId: string) {
    return axiosClient.post(`/ticket/buy`, { ticketId });
  },
  selectTicket(cyclingId: string) {
    return axiosClient.get(`/ticket/select?cyclingId=${cyclingId}`);
  },
  cancelTicket(bookingId: string) {
    return axiosClient.post(`/ticket/cancel`, { bookingId });
  },
};
