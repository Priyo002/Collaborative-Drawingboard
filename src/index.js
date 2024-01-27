import dotenv from "dotenv"
import {app} from "./app.js"
import express from "express"
import connectDB from "./db/index.js"
import fs from "fs";
dotenv.config({
    path: './.env'
})

//const http = require('http').createServer(app);
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors:{
        origin: "*",
        methods: ["GET","POST"]
    }
});

app.use(express.static('public'));

connectDB()
.then(() =>{
    io.on('connection',(socket)=>{
        console.log("New Connection " + socket.id);
    
        socket.on('mouse',(data)=>{
            socket.broadcast.emit('mouse',data);
            //console.log(data);
        })
        socket.on('disconnect', function () {
            console.log('User disconnected');
        });
    })
    httpServer.listen(process.env.PORT || 8000,()=>{
        console.log(`🛑 Server is runing at port http://localhost:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connectio failed !!!", err);
})
