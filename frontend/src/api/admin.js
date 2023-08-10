import axios from "../config/axios.js";

const getToken = () => {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin")}`,
      }
    };
  }; 
export const registerAdmin = (admin) => axios.post("/admin/register", admin);
export const loginAdmin = (admin) => axios.post("/admin/login", admin);
export const addUser = (user) => axios.post("/admin/users",user,getToken());
export const getUsers = () => axios.get("/admin/users",getToken());
export const addRole=(role)=>axios.post("/admin/roles",role,getToken())
export const fetchRoles=()=>axios.get("/admin/roles",getToken())
