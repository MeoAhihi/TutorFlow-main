import restConnector from "../connectors/AxiosRestConnector";

export const getStudents = async () => {
  const response = await restConnector().get("/students");
  return response;
};

export const getStudentInfo = async (id) => {
  const response = await restConnector().get("/students/" + id);
  return response;
};

export const postStudent = async (student) => {
  const response = await restConnector().post("/students", student);
  return response;
};

export const patchStudent = async (id, student) => {
  const response = await restConnector().patch("/students/" + id, student);
  return response;
};

export const deleteStudent = async (id) => {
  const response = await restConnector().delete("/students/" + id);
  return response;
};
