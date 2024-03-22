import { axiosClient } from "./axios-cilent";

export const stationApi = {
  getStations() {
    return axiosClient.get(`/station`);
  },
  getCountOfCyclingAtStation() {
    return axiosClient.get(`/station/count`);
  },
  getCyclingsAtStation(stationId: string | undefined) {
    return axiosClient.get(`/station/info?stationId=${stationId}`);
  },
  getCountOfAllCyclingAtStation(myLocation: string) {
    return axiosClient.post(`/station/cycling`, { origin: myLocation });
  },
};
