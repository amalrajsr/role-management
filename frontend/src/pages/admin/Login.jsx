import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import { loginAdmin } from "../../api/admin";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <LoginForm handleFunction={handleFunction} loader={loader} />
    </>
  );
}

export default Login;
