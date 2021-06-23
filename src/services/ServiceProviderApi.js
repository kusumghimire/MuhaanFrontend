import http from "../api";

const getAll = () => {
  return http.get(`/service-provider/`);
};

const ServiceProviderApi = {
  getAll,
};

export default ServiceProviderApi;
