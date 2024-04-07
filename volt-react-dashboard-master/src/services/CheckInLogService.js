import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/check-in-logs";

export const listCheckInLogWithPage = () =>
  axios.get(REST_API_BASE_URL + "/pages");

export const listCheckInLogWithParamsPage = (params) =>
  axios.get(REST_API_BASE_URL + "/pages", { params });

export const getCheckInLogById = (id) =>
  axios.get(REST_API_BASE_URL + "/" + id);

// export const updateEmployee = (employeeId, employeeObj) =>
//   axios.put(REST_API_BASE_URL + "/" + employeeId, employeeObj);

export const deleteCheckInLogById = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);
