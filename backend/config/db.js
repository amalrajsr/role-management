import mongoose from "mongoose"

//Creating database collection
mongoose.connect("mongodb://127.0.0.1:27017/user-management").then(()=>{

console.log("Database running successfully")
}).catch((err)=>{

    console.log(err)
})