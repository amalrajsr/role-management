import { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import { registerAdmin } from "../../api/admin";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Register() {
  const [loader, setLoader] = useState(false);
  const navigate=useNavigate()
  const handleFunction = (admin) => {
    setLoader(true);
    registerAdmin(admin)
      .then((res) => {
        if(res.data){
        toast.success("successfully registered");
        navigate('/admin/login')
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error.message)
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
      <RegisterForm
        header={"Register here"}
        handleFunction={handleFunction}
        loader={loader}
        redirectBtnName={"Login"}
        redirect={"/admin/login"}
      />
  );
}

export default Register;
