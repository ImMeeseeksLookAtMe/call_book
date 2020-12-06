const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


const connectDB = require('./config/db');

//ROUTES import
const contactRoute = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3001;

//load env
dotenv.config({path: './config/config.env'});

//cors
app.use(cors());

//"body-parser"
app.use(express.json({extened: true}));

//connect to DB
connectDB();

//API WAYS
app.use('/', contactRoute);

//server RUN
app.listen(port, error => {
    if(error) throw error;
    console.log('App listening on port' + ' ' + port);
});