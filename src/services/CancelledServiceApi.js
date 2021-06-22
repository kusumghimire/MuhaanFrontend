import http from "../api";

const getAll = () => {
  return http.get(`/service-request/cancelled/`);
};

const CancelledServiceApi = {
  getAll,
};

export default CancelledServiceApi;
