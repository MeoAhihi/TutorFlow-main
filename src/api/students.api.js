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
