require('./config/config');

const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const axios = require('axios');

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
    var user = new User({
      userName: userCred.userAccount,
      password: userCred.userPass
    });

    user.save().then(
      user => {
        user.generateAuthToken().then(
          token => {
            callback({ userCreated: true, tokenResponse: token });
          },
          () => {}
        );
      },
      e => {
        if (e.code === 11000) {
          callback({
            userCreated: false,
            cause: `User name "${
              user.userName
            }" is already exist. Chose different user name`
          });
        } else {
          callback({ userCreated: false, cause: 'Failed to create user' });
        }
      }
    );
  });

  socket.on('login', (userCred, callback) => {
    User.findByCredentials(userCred.username, userCred.userPassword).then(
      () => {
        callback('login successfull');
      },
      e => {
        callback(e);
      }
    );
  });

  socket.on('populate', callback => {
    axios
      .get('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
      .then(
        resp => {
          callback(resp);
        },
        rej => {
          callback(rej);
        }
      );
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
