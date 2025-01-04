import axios from "axios";
import Cookie from "js-cookie";

import { ACCESS_TOKEN } from "../constants/connector";

/**
 * @type {string}
 */
const restConnector = (cookie) => {
  const CreateRestConnector = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 30000,
    withCredentials: false,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie ? cookie : Cookie.get(ACCESS_TOKEN)}`,
    },
  });

  CreateRestConnector.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        Cookie.remove(ACCESS_TOKEN);
        window.location.reload();
      }
      return Promise.reject(error);
    }
  );

  return CreateRestConnector;
};

export default restConnector;
