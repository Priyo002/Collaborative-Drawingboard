const express = require('express');
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http,{
    cors:{
        origin: "*",
    }
});
require('dotenv').config();

http.listen(process.env.PORT || 3000,()=>{
    console.log("Server is runnig http://localhost:3000");
})

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



