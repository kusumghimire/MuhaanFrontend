import http from "../api";

const getAll = () => {
  return http.get("/customer/");
};


const CustomerApi = {
  getAll,
};

export default CustomerApi;
