import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: 'https://nyayasetu-mits-1.onrender.com',  // ✅ Replace with your frontend domain
  credentials: true,                                // ✅ Allow cookies
}));

app.use(express.static('public'))
app.use(cookieParser())

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});


import ticketRoutes from './routers/ticket.routes.js'
import userRoutes   from  './routers/user.routes.js'
import workerRoutes from './routers/worker.routes.js'
import lawyerRoutes from  './routers/lawyer.routes.js'
import adminRoutes  from  './routers/admin.routes.js'
import callRoutes   from  './routers/call.routes.js'
import authCheck    from  './routers/auth.check.js'

app.use("/ticket",ticketRoutes)
app.use("/user",userRoutes)
app.use("/admin",adminRoutes)
app.use("/worker",workerRoutes)
app.use("/lawyer",lawyerRoutes)
app.use('/call',callRoutes)
app.use('/auth',authCheck)


export default app 


