const express = require('express');
const app = express();
const http = require('http').createServer(app);
require('dotenv').config();

const io = require('socket.io')(http,{
    cors:{
        origin: "*",
        methods: ["GET","POST"]
    }
});



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


app.get('/socket.io',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})

app.get('/test',(req,res)=>{
    res.send("shgwui");
})


http.listen(process.env.PORT || 3001,()=>{
    console.log("Server is runnig http://localhost:3000");
})


