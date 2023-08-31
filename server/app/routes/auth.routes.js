module.exports = app => {
  const {signup, login} = require('../controllers/auth.controller');

  var router = require('express').Router();

  router.post('/login', login);

  router.post('/signup', signup);

  router.use('/', (req, res, next) => {
    res.status(404).json({error: 'page not found'});
  });

  app.use('/api/auth', router);
};
