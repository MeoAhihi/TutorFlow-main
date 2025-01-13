import restConnector from "../connectors/AxiosRestConnector";

export const getStudents = async () => {
  const res = await restConnector().get("/students");
  return res;
};

export const getStudentInfo = async (id) => {
  const res = await restConnector().get("/students/" + id);
  return res;
};

export const postStudent = async (student) => {
  const res = await restConnector().post("/students", student);
  return res;
};

export const patchStudent = async (id, student) => {
  const res = await restConnector().patch("/students/" + id, student);
  return res;
};

export const deleteStudent = async (id) => {
  const res = await restConnector().delete("/students/" + id);
  return res;
};
