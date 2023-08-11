import {  Route, Routes } from "react-router-dom";
import Login from "../pages/user/Login"
import Dashboard from "../pages/user/Dashboard";
import AddUser from "../pages/user/AddUser";
import EditUser from "../pages/user/EditUser";

function UserRoutes() {
  return (
   <Routes>
    <Route index  element={<Login/>}/>
    <Route path="/login"  element={<Login/>}/>
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/addUser" element={<AddUser/>} />
    <Route path="/editUser" element={<EditUser/>} />

   </Routes>
  )
}

export default UserRoutes
