const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    minlength: 3,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 1
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        require: true
      }
    }
  ]
});

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt
    .sign({ _id: user._id.toHexString(), access }, 'hello')
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(
    () => {
      return token;
    },
    () => {
      return Promise.reject();
    }
  );
};

UserSchema.methods.removeToken = function(token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: { token }
    }
  });
};

UserSchema.methods.hashPass = function() {
  let user = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
};

UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'hello');
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function(userName, password) {
  var User = this;

  console.log(userName);

  return User.find({ userName }).then(user => {
    console.log(user);
    if (!user) {
      console.log('didnt find a user');
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      console.log('bcryps start');
      bcrypt.compare(password, user[0].password, (err, res) => {
        if (res) {
          console.log('resolved');
          resolve(user);
        } else {
          console.log('rejected');
          reject();
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else if (user.isInit('password')) {
    console.log('init triggered');
    bcrypt.getSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next;
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = { User };
