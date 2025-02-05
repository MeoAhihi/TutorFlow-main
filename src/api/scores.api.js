import restConnector from "../connectors/AxiosRestConnector";

export const postScore = async (data, classId) => {
  const response = await restConnector.post(`/scores?classId=${classId}`, data);
  return response.data;
};

export const getScore = async (data, classId) => {
  const response = await restConnector.get(`/scores?classId=${classId}`, data);
  return response.data;
};

export const patchScore = async (scoreId, data) => {
  const response = await restConnector.patch(`/scores/${scoreId}`, data);
  return response.data;
};

export const deleteScore = async (scoreId) => {
  const response = await restConnector.delete(`/scores/${scoreId}`);
  return response.data;
};
