import restConnector from "../connectors/AxiosRestConnector";

export const getClasses = async () => {
  const response = await restConnector().get("/classes");
  return response;
};

export const getClassId = async (id) => {
  const response = await restConnector().get("/classes/" + id);
  return response;
};

export const patchClass = async (id, data) => {
  const response = await restConnector().patch("/classes/" + id, data);
  return response;
};

export const postClass = async (data) => {
  const response = await restConnector().post("/classes", data);
  return response;
};

export const deleteClass = async (id) => {
  const response = await restConnector().delete("/classes/" + id);
  return response;
};

export const getSchedulesDefault = async (classId) => {
  const response = await restConnector().get(
    "/schedules/default?classId=" + classId
  );
  return response;
};

export const getSchedulesOffset = async (classId) => {
  const response = await restConnector().get("/schedules/offset?classId=" + classId);
  return response;
};

export const getAssignments = async (classId) => {
  const response = await restConnector().get("/assignments?classId=" + classId);
  return response;
};

