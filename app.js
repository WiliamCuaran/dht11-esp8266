const path = require('path');

const express = require('express');

const http = require('http');

const app = express();

const socket = require('socket.io');

const mongoose = require('mongoose');

//const require = require('eddress');

var address = require('address');
var ip = require("ip");
console.log( ip.address() );




const server = http.createServer(app);

const io = socket.listen(server);

//mongoose.connect('mongodb://localhost/dht11_database')
mongoose.connect('mongodb+srv://segundo:7vbjgwxA0FFOc5zn@cluster0-9hgcp.mongodb.net/test?retryWrites=true&w=majority')
.then(db => console.log('DB is connected'))
.catch(err => console.log(err))

//const sensor = require('models');
//const mongoose = require('mongoose');

const { Schema } = mongoose;

const sensorschema = new Schema({
 temperature: Number,
 hume: Number,
 created_at: {
     type: Date,
     default: Date.now
 }


});

const sensor = mongoose.model('sensor', sensorschema);

//end
app.set('port', process.env.PORT||3000);

app.use(express.static(path.join(__dirname,'public')));

server.listen(app.get('port'), () =>{
 console.log('local server on port', app.get('port'));
});

io.on('connection', async(socket) =>{
    console.log('new user connected', socket.id);

    let messages = await sensor.find({}).limit(1).sort('-created_at');
    socket.emit('load old msgs', messages);
    

    socket.on('onpum',(data) =>{
        console.log(data);
        io.sockets.emit('Pum', { turn_on: new Date().toJSON() });
    });

    socket.on('offpum',(data) =>{
        console.log(data);
        io.sockets.emit('Pum', { turn_off: new Date().toJSON() });
    });

    socket.on('upled',(data) =>{
        console.log(data);
       socket.emit('ip', address.ip())
       io.sockets.emit('Led', { Up: new Date().toJSON() });

    });

    socket.on('downled',(data) =>{
        console.log(data);
        socket.emit('sabado', app.get('port'));
        io.sockets.emit('Led', { Down: new Date().toJSON() });
    });

    socket.on('va', (data) =>{
        console.log(data);
    });

    socket.on('hola',(data) =>{
        console.log(data);
    });

    

    socket.on('sd', (data) =>{
        console.log(data);
        io.sockets.emit('sdf', data);
    })

    socket.on('JSON',async (data) => {
        let a = data.temperature;
        let b = data.hume;
        var  newdate  = new sensor({
            temperature:a,
            hume:b
        });
        await newdate.save();
      

       console.log(data);
      
    });

    socket.on('JSON', (data) =>{
        var z = data.temperature;
        if(z> 29){
            io.sockets.emit('Temperature', { Greenhouse_over: new Date().toJSON() });
            
         }else{
            io.sockets.emit('Temperature', { Greenhouse_right: new Date().toJSON() });
         }

    })
});

