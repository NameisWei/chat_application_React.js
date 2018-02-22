const express = require('express');
const model = require('./model');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./user.js');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Chat = model.getModel('chat');

io.on('connection', (socket)=> {
    //console.log('hello socket');
    socket.on('sendMessage',(data)=>{

        const {myselfid,anotherid,messagelist} = data;
        console.log(data)
        const chatid = [myselfid,anotherid].join('_');

        Chat.create({chatid,myselfid,anotherid,content:messagelist},(err,doc)=>{
            //console.log('Chat.create',doc)
            io.emit('sendToGlobal',doc)
        })

    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRouter);


server.listen(9093,function () {
    console.log('Node app start at 9093')
})