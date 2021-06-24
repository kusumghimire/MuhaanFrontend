import http from "../api";

const getAll = () => {
  return http.get("/service/");
};

const get = (id) => {
  return http.get(`/service/${id}`);
};

const create = (data) => {
  return http.post(`/service/create/`, data);
};

const update = (id, data) => {
  return http.put(`/service/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`service/delete/${id}`);
};

const ServiceApi = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ServiceApi;
