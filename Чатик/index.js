let express = require('express');
let app = express();
let server=require('http').createServer(app);
let io = require('socket.io').listen(server);


let port = process.env.PORT || 3000;

server.listen(port)
app.get('',function(request,respons){
    respons.sendFile(__dirname+'/index.html');
});

user = [];
connections =[];
let last_user='';

io.sockets.on('connection', function (socket) {
    console.log('Успешное соединение');
    connections.push(socket);
    
    socket.on('disconnect',function (data) {
        connections.splice(connections.indexOf(socket),1); 
        console.log('Отключили');       
    });

    socket.on('send mess',function (data) {
        
        if(!last_user){
            last_user=data.name;
            io.sockets.emit('New mess',data); 
        }else{
            if(last_user===data.name){
                io.sockets.emit('Old mess',data); 
            }else{
                io.sockets.emit('New mess',data); 
                last_user=data.name;
            }
        }
        
    });
});
