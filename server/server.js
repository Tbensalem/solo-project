const express = require('express');
const app = express();
const path = require('path');
const db = require('../db/index.js');
const dbRouter = require('./dbRouter.js')
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
  console.log('home page')
    return res.status(200).sendFile(path.resolve(__dirname, '../src/index.html'))
});

app.use('/api', dbRouter, () => {
  console.log('entering the matrix')
  return res.status(200).send('Welcome back!')
});

app.use('*', (req, res) => res.status(404).send('You took a wrong turn'));

app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: `An error occurred ${err}`},
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(3000);