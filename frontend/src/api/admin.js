import axios from "../config/axios.js"


export const registerAdmin= (admin)=>axios.post('/admin/register',admin)
export const loginAdmin= (admin)=>axios.post('/admin/login',admin)