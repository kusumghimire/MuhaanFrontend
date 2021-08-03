import http from "../api";

const create = () => {
  return http.post("/change-password/");
};

const ChangePaswordApi = {
  create,
};

export default ChangePaswordApi;
