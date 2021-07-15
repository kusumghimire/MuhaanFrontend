import http from "../api";

const getAll = () => {
  return http.get(`/service-provider/credit/`);
};


const CreditsListApi = {
  getAll,
};

export default CreditsListApi;
