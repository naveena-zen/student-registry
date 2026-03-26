const express = require('express');
const cors = require('cors');
const connect = require('./connection');
require('./models/studentModel');
const router = require('./routers');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/students', router);

connect.then(() => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Running on port 3000'));
}).catch(console.log);