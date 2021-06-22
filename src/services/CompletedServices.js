import http from "../api";

const getAll = () => {
  return http.get(`/service-request/completed/`);
};

const CompletedServiceApi = {
  getAll,
};

export default CompletedServiceApi;
