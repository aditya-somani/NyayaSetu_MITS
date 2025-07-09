import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();


const corsOptions = {
  origin: 'https://nyayasetu-mits-1.onrender.com', // your frontend domain
  credentials: true, // allow cookies to be sent and received
};

app.use(cors(corsOptions));


app.options('*', cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));





import ticketRoutes from './routers/ticket.routes.js';
import userRoutes from './routers/user.routes.js';
import workerRoutes from './routers/worker.routes.js';
import lawyerRoutes from './routers/lawyer.routes.js';
import adminRoutes from './routers/admin.routes.js';
import callRoutes from './routers/call.routes.js';
import authCheck from './routers/auth.check.js';


app.use('/ticket', ticketRoutes);
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/worker', workerRoutes);
app.use('/lawyer', lawyerRoutes);
app.use('/call', callRoutes);
app.use('/auth', authCheck);



export default app;
