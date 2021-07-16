import http from "../api";

const getAll = () => {
  return http.get(`/transaction/`);
};


const TransactionApi = {
  getAll,
};

export default TransactionApi;
