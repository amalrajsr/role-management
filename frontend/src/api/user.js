import axios from "../config/axios.js";

const getToken = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user")}`,
      }
    };
  }; 

export const userLogin = (user) => axios.post("/user/login", user);
export const getUsers = () => axios.get("/user/users",getToken());
export const addUser = (user) => axios.post("/user/users",user,getToken());
export const editUser = (id,user) => axios.patch(`/user/users/${id}`,user,getToken());
export const deleteUser = (id) => axios.delete(`/user/users/${id}`,getToken());
export const getCurrentUser = () => axios.get("/user/user",getToken());

