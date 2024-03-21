import { axiosClient } from "./axios-cilent";

export const stationApi = {
  getStations() {
    return axiosClient.get(`/station`);
  },
  getCountOfCycingAtStation() {
    return axiosClient.get(`/station/count`);
  },
  getCycingsAtStation(stationId: string | undefined) {
    return axiosClient.get(`/station/info?stationId=${stationId}`);
  },
};
