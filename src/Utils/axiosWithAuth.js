import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token"); //tokenı localStoragedan alır.
  return axios.create({
    baseURL: "http://localhost:9000/api/",
    headers: token ? { authorization: token } : {},
  });
};
