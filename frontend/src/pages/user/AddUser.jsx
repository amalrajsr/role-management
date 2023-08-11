import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addUser } from "../../api/user";
import { toast } from "react-hot-toast";
import UserForm from "../../components/UserForm";

function AddUser() {
  const token = localStorage.getItem('user')
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleFunction = (user) => {
    setLoader(true);
    addUser(user)
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard");
          toast.success('successfully added')
        }
      })
      .catch((error) => {
        toast.error(error.response.data.error.message);
      })
      .finally(() => {
        setLoader(false);
      });
  }
  return (
    token?
    <UserForm
      header={"Add User"}
      handleFunction={handleFunction}
      loader={loader}
      btnName={'Add user'}
      redirect={"/dashboard"}
    /> : <Navigate to={'/login'}/>
  );
}

export default AddUser;
