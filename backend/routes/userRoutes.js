import express from "express";
import { addUser, deleteUser, editUser, fetchUser, fetchUsers, userLogin } from "../controller/userController.js";
import { authChecker } from "../middleware/authHandler.js";



const router= express()

router.post('/login',userLogin)
router.use(authChecker)
router.route('/users').get(fetchUsers).post(addUser)
router.route('/users/:id').patch(editUser).delete(deleteUser)
router.get('/user',fetchUser)

export default router