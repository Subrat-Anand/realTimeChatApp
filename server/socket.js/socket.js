const http = require('http')
const express = require('express')
const {Server} = require('socket.io')
const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "https://realtimechatapp-5m3x.onrender.com"
    }
})

const userSocketMap = {}

io.on("connection", (socket)=>{

    const userID = socket.handshake.query.userID

    if(userID!=undefined){
        userSocketMap[userID] = socket.id
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", ()=>{
        delete userSocketMap[userID]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

const getReceiverSocketId = (receiver)=>{
    return userSocketMap[receiver]
}

module.exports = {app, server, io, userSocketMap, getReceiverSocketId}
