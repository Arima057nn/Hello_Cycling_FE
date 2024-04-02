import { axiosClient } from "./axios-cilent";

export const cyclingApi = {
  findCycling(code: string) {
    return axiosClient.get(`/cycling/find?code=${code}`);
  },
};
