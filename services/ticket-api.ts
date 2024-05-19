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
};
