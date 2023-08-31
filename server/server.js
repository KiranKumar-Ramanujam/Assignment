const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

var corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const db = require('./app/models');
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.');
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message);
  });

app.get('/', (req, res) => {
  res.json({message: 'Welcome to API.'});
});

require('./app/routes/auth.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
