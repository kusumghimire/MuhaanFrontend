import http from "../api";

const create = (data) => {
  return http.post("/change-password/",data);
};

const ChangePaswordApi = {
  create,
};

export default ChangePaswordApi;
