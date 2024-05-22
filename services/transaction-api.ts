import { axiosClient } from "./axios-cilent";

export const transactionApi = {
  getAllTransaction() {
    return axiosClient.get(`/transaction/`);
  },
};
