import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/admin";
import { toast } from "react-hot-toast";
import UserForm from "../../components/UserForm";

function AddUser() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleFunction = (user) => {
    setLoader(true);
    addUser(user)
      .then((res) => {
        if (res.data.success) {
          navigate("/admin/dashboard");
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
    <UserForm
      header={"Add User"}
      handleFunction={handleFunction}
      loader={loader}
      redirectBtnName={"back"}
      redirect={"/admin/dashboard"}
    />
  );
}

export default AddUser;
