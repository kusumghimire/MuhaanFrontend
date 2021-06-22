import http from "../api";

const update = (id) => {
  return http.get(`/assign/service-provider/${id}`);
};

const AssignServiceApi = {
  update,
};

export default AssignServiceApi;
