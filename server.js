const express = require('express');
const socketIO = require('socket.io');
require('dotenv').config();

const app = express();
const server = app.listen(process.env.HOST || 3000,()=>{
    console.log("Server is runnig http://localhost:3000");
})

const io = socketIO(server);

app.use(express.static('public'));

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



