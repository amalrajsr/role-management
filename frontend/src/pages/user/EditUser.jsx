import  { useState } from 'react'
import UserForm from '../../components/UserForm';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { editUser } from '../../api/user';

function EditUser() {
    const token = localStorage.getItem('user')
    const location=useLocation()
    const currUser = location.state.user  // User details passed throgh navigate
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const handleFunction = (user) => {
      setLoader(true);
      editUser(currUser._id,user)
        .then((res) => {
          if (res.data.success) {
            navigate("/dashboard");
            toast.success('successfully updated')
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
        header={"Edit User"}
        handleFunction={handleFunction}
        loader={loader}
        redirect={"/dashboard"}
        btnName={'Update User'}
        currUser={currUser}
      /> : <Navigate to={'/login'}/>
    );
  }

export default EditUser
