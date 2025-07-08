import {Router} from 'express'
import { userMiddleware } from '../middlewares/user-auth.middleware.js'
import { intiate_call } from '../controllers/call.controllers.js'

const router=Router()

router.route('/initiateCall/:lawyerId').get(userMiddleware,intiate_call)


export default router