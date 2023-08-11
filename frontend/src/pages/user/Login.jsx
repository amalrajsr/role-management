import { useState } from 'react'
import LoginForm from '../../components/LoginForm'
import { userLogin } from '../../api/user'
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const token= localStorage.getItem('user')
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const handleFunction=(user)=>{
    userLogin(user).then((res)=>{
      if (res.data.success && res.data.token) {
        localStorage.setItem("user", res.data.token);
         toast.success("login successfull");
         navigate("/dashboard");
       } 
    }).catch((error)=>{
      toast.error(error.response.data.error.message);
    }).finally(()=>{
      setLoader(false)
    })
  }
  return (
    !token ?
    <LoginForm  heading={'User Login'} handleFunction={handleFunction} loader={loader}/>
    : <Navigate to={'/dashboard'} />
  )
}

export default Login
