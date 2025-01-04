import axios from "axios";

import { ACCESS_TOKEN } from "../constants/connector";

const restConnector = () => {
  const CreateRestConnector = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    },
  });

  CreateRestConnector.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        window.location.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return CreateRestConnector;
};

export default restConnector;
