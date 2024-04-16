import express from 'express'
import {fetchUserData,editProfile,resetPassword,deleteAccount} from '../controller/userController.js'
import { verfiyToken } from '../middlewares/verifyToken.js'

const router=express.Router()

router.get('/profile',verfiyToken,fetchUserData)
router.put('/editProfile/:id',verfiyToken,editProfile)
router.patch('/resetPassword/:id',verfiyToken,resetPassword)
router.delete('/deleteAccount/:id',verfiyToken,deleteAccount)



export default router