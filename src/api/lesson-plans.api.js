import restConnector from "../connectors/AxiosRestConnector";

export const postLessonPlan = async (data, classId) => {
    const response = await restConnector.post(`/lesson-plans?classId=${classId}`, data);
    return response.data;
};

export const getLessonPlanId = async (lessonPlanId) => {
    const response = await restConnector.get(`/lesson-plans/${lessonPlanId}`);
    return response.data;
};

export const getLessonPlan = async (classId) => {
    const response = await restConnector.get(`/lesson-plans?classId=${classId}`);
    return response.data;
};

export const patchLessonPlan = async (lessonPlanId, data) => {
    const response = await restConnector.patch(`/lesson-plans/${lessonPlanId}`, data);
    return response.data;
};

export const deleteLessonPlan = async (lessonPlanId) => {
    const response = await restConnector.delete(`/lesson-plans/${lessonPlanId}`);
    return response.data;
};