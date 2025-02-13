import restConnector from "../connectors/AxiosRestConnector";

export const getClasses = async () => {
  const res = await restConnector().get("/classes");
  return res;
};

export const getClassId = async (id) => {
  const res = await restConnector().get("/classes/" + id);
  return res;
};

export const patchClass = async (id, data) => {
  const res = await restConnector().patch("/classes/" + id, data);
  return res;
};

export const postClass = async (data) => {
  const res = await restConnector().post("/classes", data);
  return res;
};

export const deleteClass = async (id) => {
  const res = await restConnector().delete("/classes/" + id);
  return res;
};

export const getSchedulesDefault = async (classId) => {
  const res = await restConnector().get(
    "/schedules/default?classId=" + classId
  );
  return res;
};

export const getSchedulesOffset = async (classId) => {
  const res = await restConnector().get("/schedules/offset?classId=" + classId);
  return res;
};

export const getAssignments = async (classId) => {
  const res = await restConnector().get("/assignments?classId=" + classId);
  return res;
};

