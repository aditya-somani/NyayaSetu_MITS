import {Router} from 'express'
import {upload} from '../middlewares/multer.middleware.js'
import { lawyerMiddleware } from '../middlewares/lawyer-auth.middleware.js'
import { getCallHistory, loginLawyer, registerLawyer,allLawyers} from '../controllers/lawyer.controllers.js'

const router=Router()

router.route('/register').post(
    registerLawyer
  );
  


    router.route('/login').post(loginLawyer)


    router.route('/get-call-history').get(lawyerMiddleware,getCallHistory)

    
    router.route('/get-lawyers').get(allLawyers)



export default router