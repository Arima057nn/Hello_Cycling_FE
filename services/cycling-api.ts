import { axiosClient } from "./axios-cilent";

export const cyclingApi = {
  findCycling(code: string) {
    return axiosClient.get(`/cycling/find?code=${code}`);
  },
  getCycling(code: string) {
    return axiosClient.get(`/cycling/get?code=${code}`);
  },
  reportCycling(cyclingId: string, title: string, description: string) {
    return axiosClient.post("/report/create", {
      cyclingId,
      title,
      description,
    });
  },
};
