import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8081/api/departments";

export const listDepartmentsPage = (params) =>
  axios.get(REST_API_BASE_URL + "/pages", { params });

export const getDepartmentById = (id) =>
  axios.get(REST_API_BASE_URL + "/" + id);

export const getEmployeesDepartment = (id) => {
  axios.get(REST_API_BASE_URL + "/" + id + "/get-users");
};
