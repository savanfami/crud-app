import { userLogin, userSignup } from "../controller/authController.js";
import express from 'express'

const router=express.Router()

router.post('/register',userSignup)
router.post('/login',userLogin)




export default router