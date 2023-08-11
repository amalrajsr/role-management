import {  Route, Routes } from "react-router-dom";
import Register from "../pages/admin/Register";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AddUser from "../pages/admin/AddUser"; 
function AdminRoutes() {
  return (
    <Routes>
        <Route index element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/addUser" element={<AddUser/>} />
    </Routes>
  )
}

export default AdminRoutes
