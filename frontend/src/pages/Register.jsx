import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { registerAdmin } from '../api/admin'
import { toast } from "react-hot-toast";
function Register() {
  const [loader,setLoader]=useState(false)
  const handleFunction=(user)=>{
    setLoader(true)
    registerAdmin(user).then((res)=>{
      console.log(res)
      toast.success('successfully registered')
     }).catch((error)=>{
        console.log(error)
     }).finally(()=>{
      setLoader(false)

     })
  }

  return (
    <>
      <RegisterForm header={'Register here'} handleFunction={handleFunction} loader={loader}/>
    </>
  )
}

export default Register
