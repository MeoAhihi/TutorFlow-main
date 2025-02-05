import restConnector from "../connectors/AxiosRestConnector";

export const postDefaultSchedule = async (data, classId) => {
  const response = await restConnector.post(
    `/schedules/default?classId=${classId}`,
    data
  );
  return response.data;
};

export const getDefaultScheduleId = async (defaultScheduleId) => {
  const response = await restConnector.get(
    `/schedules/default/${defaultScheduleId}`
  );
  return response.data;
};

export const getDefaultSchedule = async (data, classId) => {
  const response = await restConnector.get(
    `/schedules/default?classId=${classId}`,
    data
  );
  return response.data;
};

export const patchDefaultSchedule = async (data, defaultScheduleId) => {
  const response = await restConnector.patch(
    `/schedules/default/${defaultScheduleId}`,
    data
  );
  return response.data;
};

export const deleteDefaultSchedule = async (defaultScheduleId) => {
  const response = await restConnector.delete(
    `/schedules/default/${defaultScheduleId}`
  );
  return response.data;
};

export const postOffsetSchedule = async (data, classId) => {
  const response = await restConnector.post(
    `/schedules/offset?classId=${classId}`,
    data
  );
  return response.data;
};

export const getOffsetScheduleId = async (offsetScheduleId) => {
  const response = await restConnector.get(
    `/schedules/offset/${offsetScheduleId}`
  );
  return response.data;
};
export const getOffsetSchedule = async (data, classId) => {
  const response = await restConnector.get(
    `/schedules/offset?classId=${classId}`,
    data
  );
  return response.data;
};

export const patchOffsetSchedule = async (data, offsetScheduleId) => {
  const response = await restConnector.patch(
    `/schedules/offset/${offsetScheduleId}`,
    data
  );
  return response.data;
};

export const deleteOffsetSchedule = async (offsetScheduleId) => {
  const response = await restConnector.delete(
    `/schedules/offset/${offsetScheduleId}`
  );
  return response.data;
};

export const getCurrentWeekSchedule = async () => {
  const response = await restConnector.get(`/schedules/current-week`);
  return response.data;
};
