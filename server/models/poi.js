var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// poi model
module.exports = mongoose.model('Poi', new Schema({ 
    nome: String ,
    tipologia: String ,
    descrizione: String,
    posizione: String ,
    stato: String ,
    orari_apertura: String , 
    immagine: String
}));