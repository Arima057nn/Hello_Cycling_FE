import { axiosClient } from "./axios-cilent";

export const ticketApi = {
  getTickets() {
    return axiosClient.get(`/ticket/`);
  },
};
