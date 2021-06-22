import http from "../api";

const getAll = () => {
  return http.get(`/zone/`);
};

const get = (id) => {
  return http.get(`/zone/${id}/`);
};

const create = (data) => {
  return http.post(`/zone/create/`, data);
};

const update = (id, data) => {
  return http.put(`/zone/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/zone/delete/${id}/`);
};

const ZoneApi = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default ZoneApi;
