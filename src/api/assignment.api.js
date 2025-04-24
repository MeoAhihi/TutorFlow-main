import restConnector from "../connectors/AxiosRestConnector";

/**
 * @typedef {Object} Assignment
 * @property {number} classId - The ID of the class associated with the assignment
 * @property {string} title - The title of the assignment
 * @property {Date} dueDate - The due date of the assignment
 * @property {string} content - The content of the assignment
 * @property {Object} attachedFiles - The attached files for the assignment
 */

/**
 * Creates a new assignment for a given class ID.
 *
 * @param {Object} data - The data for the new assignment.
 * @param {number} classId - The ID of the class to create the assignment for.
 * @returns {AxiosResponse<{message: string, Assignment: Assignment}>} A promise that resolves to the response object containing the created assignment.
 */
export const postAssignment = async (data, classId) => {
  const response = await restConnector().post(
    `/assignments?classId=${classId}`,
    data
  );
  return response;
};

/**
 * Fetches the assignment details for a given assignment ID.
 *
 * @param {string} assignmentId - The ID of the assignment to retrieve.
 * @returns {AxiosResponse<{message: string, Assignment: Assignment}>} A promise that resolves to the response object containing assignment details.
 */
export const getAssignmentId = async (assignmentId) => {
  const response = await restConnector().get(`/assignments/${assignmentId}`);
  return response;
};

/**
 * Fetches assignments for a given class ID.
 *
 * @param {string} classId - The ID of the class to fetch assignments for.
 * @param {Object} data - Additional data or parameters to include in the request.
 * @returns {Promise<AxiosResponse<Assignment>>} The response from the server containing the assignments.
 */
export const getAssignment = async (classId, data) => {
  const response = await restConnector().get(
    `/assignments?classId=${classId}`,
    data
  );
  console.log(response);
  return response;
};

/**
 * Updates an assignment with the given data.
 *
 * @param {string} assignmentId - The ID of the assignment to update.
 * @param {Object} data - The data to update the assignment with.
 * @returns {Promise<AxiosResponse<Assignment>>} The response from the server.
 */
export const patchAssignment = async (assignmentId, data) => {
  const response = await restConnector().patch(
    `/assignments/${assignmentId}`,
    data
  );
  return response;
};

export const deleteAssignment = async (assignmentId) => {
  const response = await restConnector().delete(`/assignments/${assignmentId}`);
  return response;
};
