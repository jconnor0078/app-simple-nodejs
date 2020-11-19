const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const PORT = process.env.PORT || 4000;

const routes = require('./routes/v1');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routes(app);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Conected to Mongo DB');
    app.listen(PORT, () => {
      console.log(`running on ${PORT} PORT`);
    });
  })
  .catch((error) => {
    console.log('ERROR MONGO DB: ', error);
  });
