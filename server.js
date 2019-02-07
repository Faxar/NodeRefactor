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

  socket.on('regMe', (userCred, callback) => {
    let tokenResp;

    var user = new User({
      userName: userCred.userAccount,
      password: userCred.userPass
    });

    user.generateAuthToken().then(
      toke => {
        tokenResp = toke;
        callback({
          userCreated: true,
          userThatCreated: userCred.userAccount,
          tokenThatCreated: tokenResp
        });
      },
      () => {
        callback({
          userCreated: false,
          userThatCreated: userCred.userAccount
        });
      }
    );

    user.save().then(() => {}, e => {});
  });

  socket.on('pleaseLogin', (userCred, callback) => {
    User.findByCredentials(userCred.username, userCred.userPassword).then(
      () => {
        console.log('User was confirmed');
      },
      () => {
        console.log('Response was reject');
      }
    );
    let repText = 'response positive';
    callback(repText);
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
