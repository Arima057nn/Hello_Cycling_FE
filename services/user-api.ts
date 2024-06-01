import { axiosClient } from "./axios-cilent";

export const userApi = {
  createName(name: string) {
    return axiosClient.post(`/user/updateProfile`, { name });
  },
  register(
    user_id: string | undefined,
    phone_number: string | null | undefined
  ) {
    return axiosClient.post(`/user/register`, { user_id, phone_number });
  },
  getInfoUser() {
    return axiosClient.get(`/user/info`);
  },
  updateProfile(name: string) {
    return axiosClient.post(`/user/updateProfile`, { name });
  },
};
