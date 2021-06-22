import http from "../api";

const getAll = () => {
  return http.get(`/service-request/incoming/`);
};

const RequestServiceApi = {
  getAll,
};

export default RequestServiceApi;
