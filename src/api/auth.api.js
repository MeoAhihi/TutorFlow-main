import restConnector from "/src/connectors/AxiosRestConnector";

export const login = async (email, password) => {
  const res = await restConnector().post("/auth/login", {
    email,
    password,
  });
  return res;
};

export const register = async (email, password, firstName, lastName) => {
  const res = await restConnector().post("/auth/register", {
    email,
    password,
    firstName,
    lastName,
  });
  return res;
};
