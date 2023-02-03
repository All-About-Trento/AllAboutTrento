var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user model
module.exports = mongoose.model('Utenti', new Schema({ 
    nome: String,
    cognome: String,
    email: String,
    numTelefono: String, 
    password: String,
    ruolo: String
}));

