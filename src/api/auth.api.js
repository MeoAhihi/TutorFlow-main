import restConnector from "../connectors/AxiosRestConnector";

export const login = async (email, password) => {
  const response = await restConnector().post("/auth/login", {
    email,
    password,
  });
  return response;
};

export const register = async (email, password, firstName, lastName) => {
  const response = await restConnector().post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return response;
};
