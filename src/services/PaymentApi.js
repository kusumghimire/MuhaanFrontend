import http from "../api";

const getAll = () => {
  return http.get("/payment-gateway/");
};
const get = (id) => {
    return http.get(`/payment-gateway/${id}/`);
  };
  
  const create = (data) => {
    return http.post(`/payment-gateway/create/`, data);
  };
  
  const update = (id, data) => {
    return http.put(`/payment-gateway/update/${id}/`, data);
  };
  
  const remove = (id) => {
    return http.delete(`/payment-gateway/delete/${id}/`);
  };

const PaymentApi = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default PaymentApi;
