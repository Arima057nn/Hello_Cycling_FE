import { axiosClient } from "./axios-cilent";

export const userApi = {
  createName(name: string) {
    return axiosClient.post(`/user/updateProfile`, { name });
  },
  register(){
    return axiosClient.post(`/user/register`);
  },
  getInfoUser() {
    return axiosClient.get(`/user/info`);
  }
};
