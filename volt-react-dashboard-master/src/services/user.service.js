import axios from "axios";
import authHeader from "./auth-header";
import { useRevalidator } from "react-router-dom";

const API_URL = "http://localhost:8081/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "test/all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "test/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "test/mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "test/admin", { headers: authHeader() });
};

const getUser = (userId) => {
  return axios.get(API_URL + "users/" + userId);
};

const getAllUsers = () => {
  return axios.get(API_URL + "users");
};

const updateUser = (userId, userObj) => {
  return axios.put(API_URL + "users/" + userId, userObj);
};

const deleteUser = (userId) => {
  return axios.delete(API_URL + "users/" + userId);
};

const getEmployeesByJobTitlePage = (params) => {
  return axios.get(API_URL + "users/get-users-title/pages", { params });
};

const getEmployeesByDepartmentPage = (id, params) => {
  return axios.get(API_URL + "users/shift/" + id + "/pages", { params });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getEmployeesByJobTitlePage,
  getEmployeesByDepartmentPage,
};

export default UserService;
