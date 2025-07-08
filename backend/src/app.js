import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "http://localhost:8080", // ✅ your frontend URL
  credentials: true,               // ✅ important!
}));
app.use(express.static('public'))
app.use(cookieParser())



import ticketRoutes from './routers/ticket.routes.js'
import userRoutes   from  './routers/user.routes.js'

app.use("/ticket",ticketRoutes)
app.use("/user",userRoutes)


export default app 


