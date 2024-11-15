import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import calenderRoutes from './routes/calenderRoutes.js'
import connectDB from './config/db.js'

const app=express()

dotenv.config();
connectDB();

const allowedOrigins = ['https://submission-sarayu.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))
app.use(express.json());



app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/calender',calenderRoutes);


app.get('/',(req,res)=>{
    res.send('Server is Up')
});


const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

