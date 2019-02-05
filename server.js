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
var { mongoose } = require('./db/mongoose');
var { User } = require('./models/user');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.send;
});

io.on('connection', socket => {
  console.log('new user connected');

  socket.on('regUs', (userCred, callback) => {
    var user = new User({
      userName: userCred.userAccount,
      password: userCred.userPass
    });

    user.save().then(
      () => {
        callback('User Created');
      },
      e => {
        callback(e);
      }
    );
  });

  socket.on('pleaseLogin', (userCred, callback) => {
    User.findByCredentials(userCred.username, userCred.userPassword).then(
      user => {
        console.log(user);
      },
      e => {
        console.log('Server side rejected with e ' + e);
      }
    );
    let repText = 'response positive';
    callback(repText);
  });

  socket.on('text', (text, callback) => {
    let responseText = 'Some text from server and ' + text;
    console.log('server side ', text);
    callback(responseText);
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
