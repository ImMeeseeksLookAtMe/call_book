const express = require('express');
const cors = require('cors');

const app = express(); 
const port = process.env.PORT || 6000;

app.use(express.json({extened: true}));
app.use(cors());

app.listen(port, error => {
    if(error) throw error;
    console.log('App listening on port' + ' ' + port);
});

//______ROUTES_______

// @desc get form Data
// @route => /cliets
// @type POST 

