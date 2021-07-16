import http from "../api";

const getAll = () => {
  return http.get(`/service-provider/debit/`);
};


const DebitListApi = {
  getAll,
};

export default DebitListApi;
