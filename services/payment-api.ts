import { axiosClient } from "./axios-cilent";

export const paymentApi = {
  paymentByMomo(amount: string) {
    return axiosClient.post(`/payment/momo`, { amountOfMoney: amount });
  },
  checkTransctionStatus(orderId: string) {
    return axiosClient.post(`/payment/transaction-status`, { orderId });
  },
};
