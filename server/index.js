const express = require('express');
require('dotenv').config()
const DBconnect = require('./config/dataBase');
const authRouter = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const messageRoute = require('./routes/message.route');
const { app, server } = require('./socket.js/socket');


const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://realtimechatapp-5m3x.onrender.com",
    credentials: true
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/user', messageRoute)

DBconnect()
        .then(()=>{
            console.log("DataBase Connect Successfully...")
            server.listen(PORT, () => {
                console.log(`App is Listening at the PORT ${PORT}`);
            });
        })
        .catch((err)=>{
            console.error("DataBase Could not Connect Successfully", err)
        })
