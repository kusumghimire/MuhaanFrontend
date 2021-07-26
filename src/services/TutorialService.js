import http from "../api";

const getAll = () => {
  // console.log(getAll())
  return http.get(`/category/`);
};
const getTopCategory=()=>{
  return http.get(`/top_level_category/`);
}
const getSubCategory = (id,data) => {
  // console.log(getAll())
  return http.get(`/sub/${id}/`, data);
};

const get = (id) => {
  return http.get(`/category/${id}`);
};

const create = (data) => {
  return http.post(`/category/create/`, data);
};

const update = (id, data) => {
  return http.put(`/category/update/${id}/`, data);
};

const remove = (id) => {
  return http.delete(`/category/delete/${id}/`);
};

const findByTitle = (title) => {
  return http.get(`/category?title=${title}`);
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle,
  getSubCategory,
  getTopCategory
};

export default TutorialService;
