import http from "../api";

const getAll = () => {
  return http.get("/service-provider/");
};

const create = (data) => {
  return http.post(`/service-provider/registration/`,data);
};

const ServiceProviderApi = {
  getAll,
  create,
};

export default ServiceProviderApi;
