const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./config/config')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/usuario', (req, res) => {
    res.json("get usuario");
});

app.post('/usuario', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            error: true,
            msg: 'El nombre es obligatorio'
        });
    }
    else {
        res.json({ body });
    }

});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;

    res.json({
        id
    });
});


app.delete('/usuario', (req, res) => {
    res.json("delete  usuario");
});



app.listen(process.env.PORT, () => {
    console.log("escuchando puerto", process.env.PORT);
});