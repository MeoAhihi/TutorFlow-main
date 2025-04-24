import restConnector from "../connectors/AxiosRestConnector";

export const postSession = async (classId, data) => {
  const response = await restConnector().post("/sessions?classId=" + classId, data);
  return response;
};

export const getAttendances = async (classId) => {
  const response = await restConnector().get(
    "/sessions/attendances?classId=" + classId
  );
  return response;
};

export const getSessionId = async (id) => {
  const response = await restConnector().get("/sessions/" + id);
  return response;
};

export const getSessions = async (classId) => {
  const response = await restConnector().get("/sessions?classId=" + classId);
  return response;
};

export const endSession = async (id) => {
  const response = await restConnector().patch("/sessions/" + id + "/end");
  return response;
};

export const postAttendance = async (id, data) => {
  const response = await restConnector().post(
    "/sessions/" + id + "/attendances",
    data
  );
  return response;
};

export const patchSession = async (id, data) => {
  const response = await restConnector().patch("/sessions/" + id, data);
  return response;
};
