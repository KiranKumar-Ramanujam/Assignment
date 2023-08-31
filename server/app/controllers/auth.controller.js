const crypto = require('crypto');
const db = require('../models');
const User = db.user;

exports.signup = (req, res, next) => {
  const date = new Date();
  const timezoneOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  const currentDateWithTimezone = new Date(
    Date.now() - timezoneOffsetInMs,
  ).toISOString();

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then(dbUser => {
    if (dbUser) {
      res.send({
        meta: {
          status: 500,
          success: false,
          message: 'Email already exist',
        },
        data: {},
      });
    } else if (req.body.email && req.body.password) {
      const passwordHash = crypto
        .createHash('md5')
        .update(req.body.password)
        .digest('hex');
      return User.create({
        userId: req.body.userId,
        fullname: req.body.fullname,
        email: req.body.email,
        password: passwordHash,
        passwordDate: currentDateWithTimezone,
      })
        .then(() => {
          res.send({
            meta: {
              status: 200,
              success: true,
              message: 'User created',
            },
            data: {},
          });
        })
        .catch(err => {
          console.log(err);
          res.send({
            meta: {
              status: 500,
              success: false,
              message: 'Error while creating the user',
            },
            data: {},
          });
        });
    } else if (!req.body.password) {
      res.send({
        meta: {
          status: 500,
          success: false,
          message: 'Password not provided',
        },
        data: {},
      });
    } else if (!req.body.email) {
      res.send({
        meta: {
          status: 500,
          success: false,
          message: 'Email not provided',
        },
        data: {},
      });
    }
  });
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.userEmail,
    },
  })
    .then(dbUser => {
      if (!dbUser) {
        res.send({
          meta: {
            status: 500,
            success: false,
            message: 'User not found',
          },
          data: {},
        });
      } else {
        const passwordHash = crypto
          .createHash('md5')
          .update(req.body.userPassword)
          .digest('hex');
        if (passwordHash == dbUser.password) {
          res.send({
            meta: {
              status: 200,
              success: true,
              message: 'User Logged In',
            },
            data: dbUser,
          });
        } else {
          res.status(500);
          res.send({
            meta: {
              status: 500,
              success: false,
              message: 'Invalid Email or Password',
            },
            data: {},
          });
        }
      }
    })
    .catch(err => {
      console.log('error', err);
    });
};
