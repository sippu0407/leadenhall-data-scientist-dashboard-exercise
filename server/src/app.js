const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

const { PORT } = require('./config/serverConfig');
const connect = require('./config/dbConfig');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(morgan('dev')); 
app.use(helmet()); 


const serverSetup = async () => {
 
  await connect();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

serverSetup();
