import axios from "../config/axios.js"


export const registerAdmin= (user)=>axios.post('/admin/register',user)