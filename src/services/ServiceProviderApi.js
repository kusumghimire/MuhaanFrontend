import http from "../api";

const getAll = () => {
  return http.get("/service-provider/");
};

const create = () => {
  return http.post(`/service-provider/registration/`);
};

const ServiceProviderApi = {
  getAll,
  create,
};

export default ServiceProviderApi;
