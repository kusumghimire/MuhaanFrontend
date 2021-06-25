import http from "../api";

const create = () => {
  return http.create(`/service-provider`);
};

const ServiceProviderApi = {
  create,
};

export default ServiceProviderApi;
