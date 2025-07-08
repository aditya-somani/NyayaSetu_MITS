import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.static('public'))
app.use(cookieParser())



export default app 


