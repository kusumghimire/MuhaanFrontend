import http from "../api";

const getAll = () => {
  return http.get("add-on/");
};

const get = (id) => {
  return http.get(`/add-on/${id}`);
};

const create = (data) => {
  return http.post("add-on/create/", data);
};

const update = (id, data) => {
  return http.put(`/add-on/${id}`, data);
};

const remove = (id) => {
  return http.delete(`add-on/delete/${id}`);
};


// const findByTitle = (title) => {
//   return http.get(`/category?title=${title}`);
// };

const AddOnApi = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default AddOnApi;
