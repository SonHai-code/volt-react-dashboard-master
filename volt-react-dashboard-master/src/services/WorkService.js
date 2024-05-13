import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/works";

export const getDetailWorkingShifts = (userId) =>
  axios.get(REST_API_BASE_URL + "/get-work-details/" + userId);

export const getOverallWorkingShift = (params) =>
  axios.get(REST_API_BASE_URL + "/get-work-overalls", { params });

export const getDetailWorkingShiftByEmployeeCode = (params) =>
  axios.get(REST_API_BASE_URL + "/get-work-details/code", { params });
