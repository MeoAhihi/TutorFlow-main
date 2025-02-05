import restConnector from "../connectors/AxiosRestConnector";

export const postAssignment = async (data, classId) => {
  const response = await restConnector.post(
    `/assignments?classId=${classId}`,
    data
  );
  return response.data;
};

export const getAssignmentId = async (assignmentId) => {
  const response = await restConnector.get(`/assignments/${assignmentId}`);
  return response.data;
};

export const getAssignment = async (data) => {
  const response = await restConnector.get(
    `/assignments?classId=${classId}`,
    data
  );
  return response.data;
};

export const patchAssignment = async (assignmentId, data) => {
  const response = await restConnector.patch(
    `/assignments/${assignmentId}`,
    data
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId) => {
    const response = await restConnector.delete(`/assignments/${assignmentId}`);
    return response.data;
};

