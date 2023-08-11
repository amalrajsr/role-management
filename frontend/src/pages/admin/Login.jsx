import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { loginAdmin } from "../../api/admin";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const token = localStorage.getItem('admin')
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleFunction = (admin) => {
    setLoader(true);
    loginAdmin(admin)
      .then((res) => {
        if (res.data.success && res.data.token) {
         localStorage.setItem("admin", res.data.token);
          toast.success("login successfull");
          navigate("/admin/dashboard");
        } 
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    
     !token ? <LoginForm heading={'Admin Login'} handleFunction={handleFunction} loader={loader} /> : <Navigate to={'/admin/dashboard'}/>
    
  );
}

export default Login;
