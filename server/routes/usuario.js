const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Usuario = require('../models/usuario')
const app = express();

app.get('/usuario', (req, res) => {

    //desde 
    let desde = Number(req.query.desde || 0);
    let limite = Number(req.query.limite || 5);

    Usuario.find({ estado: true }, 'nombre correo role estado google img') //filtran camops que queramos mostrar o evniar al front
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    error: true,
                    err
                });
            }
            //contar numero de usuarios  // con un callback
            Usuario.count({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            });

        })
});

app.post('/usuario', (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        correo: body.correo,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                error: true,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });


    });


});

app.put('/usuario/:id', (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ["nombre", "correo", "img", "role", "estado"]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                error: true,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});


app.delete('/usuario/:id', (req, res) => {

    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiarEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    menssage: `No existe un usuario con el id : ${id}`,
                }

            });
        };

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    })

});






module.exports = app;