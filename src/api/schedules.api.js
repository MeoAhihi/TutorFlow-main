import restConnector from "../connectors/AxiosRestConnector";

export const postDefaultSchedule = async (data, classId) => {
  const response = await restConnector().post(
    `/schedules/default?classId=${classId}`,
    data
  );
  return response;
};

export const getDefaultScheduleId = async (defaultScheduleId) => {
  const response = await restConnector().get(
    `/schedules/default/${defaultScheduleId}`
  );
  return response;
};

export const getDefaultSchedule = async (data, classId) => {
  const response = await restConnector().get(
    `/schedules/default?classId=${classId}`,
    data
  );
  return response;
};

export const patchDefaultSchedule = async (data, defaultScheduleId) => {
  const response = await restConnector().patch(
    `/schedules/default/${defaultScheduleId}`,
    data
  );
  return response;
};

export const deleteDefaultSchedule = async (defaultScheduleId) => {
  const response = await restConnector().delete(
    `/schedules/default/${defaultScheduleId}`
  );
  return response;
};

export const postOffsetSchedule = async (data, classId) => {
  const response = await restConnector().post(
    `/schedules/offset?classId=${classId}`,
    data
  );
  return response;
};

export const getOffsetScheduleId = async (offsetScheduleId) => {
  const response = await restConnector().get(
    `/schedules/offset/${offsetScheduleId}`
  );
  return response;
};
export const getOffsetSchedule = async (data, classId) => {
  const response = await restConnector().get(
    `/schedules/offset?classId=${classId}`,
    data
  );
  return response;
};

export const patchOffsetSchedule = async (data, offsetScheduleId) => {
  const response = await restConnector().patch(
    `/schedules/offset/${offsetScheduleId}`,
    data
  );
  return response;
};

export const deleteOffsetSchedule = async (offsetScheduleId) => {
  const response = await restConnector().delete(
    `/schedules/offset/${offsetScheduleId}`
  );
  return response;
};

export const getCurrentWeekSchedule = async () => {
  const response = await restConnector().get(`/schedules/current-week`);
  return response;
};
