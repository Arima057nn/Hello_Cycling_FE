import { axiosClient } from "./axios-cilent";

export const paymentApi = {
  paymentByMomo() {
    return axiosClient.post(`/payment/momo`);
  },
};
