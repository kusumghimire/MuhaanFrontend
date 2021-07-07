import http from "../api";

const getAll = () => {
  return http.get("/payment-gateway/");
};


const PaymentApi = {
  getAll,
};

export default PaymentApi;
