import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/shifts";

export const listAllShifts = () => axios.get(REST_API_BASE_URL);

export const listShiftsSorted = () => axios.get(REST_API_BASE_URL + "/sorted");

export const listShiftsPage = (params) =>
  axios.get(REST_API_BASE_URL + "/pages", { params });

export const getShiftById = (id) => axios.get(REST_API_BASE_URL + "/" + id);

export const updateShiftById = (id, shiftObj) =>
  axios.put(REST_API_BASE_URL + "/" + id, shiftObj);

export const deleteShiftById = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);

export const deleteAllShifts = () => axios.delete(REST_API_BASE_URL);
