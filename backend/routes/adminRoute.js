import express from "express";
import { addRole, addUser, fetchRole, fetchUsers, login, register } from "../controller/admin.controller.js";
import { authChecker } from "../middleware/authHandler.js";

const router= express()

router.post('/register',register)
router.post('/login',login)
router.use(authChecker)
router.route('/users').post(addUser).get(fetchUsers)
router.route('/roles').post(addRole).get(fetchRole)

export default router