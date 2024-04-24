import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/departments";

export const listDepartmentsPage = (params) =>
  axios.get(REST_API_BASE_URL + "/pages", { params });

export const listDepartmentNames = () =>
  axios.get(REST_API_BASE_URL + "/get-all-names");

export const listAllShiftsByDepartmentName = (name) =>
  axios.get(REST_API_BASE_URL + "/get-shifts/" + name);

export const getDepartmentById = (id) =>
  axios.get(REST_API_BASE_URL + "/" + id);

export const getDepartmentByName = (name) =>
  axios.get(REST_API_BASE_URL + "/name/" + name);

export const getEmployeesDepartment = (id) => {
  axios.get(REST_API_BASE_URL + "/" + id + "/get-users");
};
