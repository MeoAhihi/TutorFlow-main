import restConnector from "../connectors/AxiosRestConnector";

export const postSession = async (classId, data) => {
  const res = await restConnector().post("/sessions?classId=" + classId, data);
  return res;
};

export const getAttendances = async (classId) => {
  const res = await restConnector().get(
    "/sessions/attendances?classId=" + classId
  );
  return res;
};

export const getSessionId = async (id) => {
  const res = await restConnector().get("/sessions/" + id);
  return res;
};

export const getSessions = async (classId) => {
  const res = await restConnector().get("/sessions?classId=" + classId);
  return res;
};

export const endSession = async (id) => {
  const res = await restConnector().patch("/sessions/" + id + "/end");
  return res;
};

export const postAttendance = async (id, data) => {
  const res = await restConnector().post(
    "/sessions/" + id + "/attendances",
    data
  );
  return res;
};

export const patchSession = async (id, data) => {
  const res = await restConnector().patch("/sessions/" + id, data);
  return res;
};
