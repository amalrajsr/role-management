// import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/admin/Register";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddUser from "./pages/admin/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/register" element={<Register/>} />
        <Route path="/admin/login" element={<Login/>} />
        <Route path="/admin/dashboard" element={<Dashboard/>} />
        <Route path="/admin/addUser" element={<AddUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
