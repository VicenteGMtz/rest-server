const { Mongoose } = require("mongoose")
const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

let usuarioEsquema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es requerido'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        mongooseHidden: true
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false
    }

});

usuarioEsquema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
usuarioEsquema.plugin(mongooseHidden, { hidden: { _id: false, password: true } });
module.exports = mongoose.model('Usuario', usuarioEsquema);