import express from "express";
import { register } from "../controller/admin.controller.js";

const router= express()

router.post('/register',register)


export default router