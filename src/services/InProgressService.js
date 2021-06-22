import http from "../api";

const getAll = () => {
  return http.get(`/service-request/inprogress/`);
};

const InProgressServiceApi = {
  getAll,
};

export default InProgressServiceApi;
