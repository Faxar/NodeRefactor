require('./config/config');

const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const port = process.env.PORT;
const publicPath = path.join(__dirname, './files');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.send
});

io.on('connection', (socket) => {
    console.log('new user connected');
    
    socket.on('regUs', (userCred, callback)=> {
        var user = new User({
            userName: userCred.userN,
            password: userCred.pass
        });
    
        user.findByCredentials(user.userName, user.password).then(());
    
        user.save().then(()=>{
            callback('User Created');
        }, (e) => {
            callback(e);
        });
    }); 
}); 

server.listen(port, ()=> {
    console.log(`Started up at port ${port}`);
});


