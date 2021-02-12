const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('./config/config')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'))



mongoose.connect('mongodb://localhost:27017/cafe', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log("Base de datos online");

})
app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT);
});