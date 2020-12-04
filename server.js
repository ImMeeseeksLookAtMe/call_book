const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

//ROUTES import
const contactRoute = require('./routes/contact');

const app = express();
const port = process.env.PORT || 6000;

//load env
dotenv.config({path: './config/config.env'});

//"body-parser"
app.use(express.json({extened: true}));

//cors
app.use(cors());

//connect to DB
connectDB();

//API WAYS
app.use('/', contactRoute);

//server RUN
app.listen(port, error => {
    if(error) throw error;
    console.log('App listening on port' + ' ' + port);
});