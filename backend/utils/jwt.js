import jwt  from "jsonwebtoken"

const maxAge= 1*24*60*60   // day-hour-minute-second
export const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET,{expiresIn:maxAge})
}


