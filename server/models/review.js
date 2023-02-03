var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// review model
module.exports = mongoose.model('Review', new Schema({ 
    titolo: String , 
    descrizione: String , 
    valutazione: Number , 
    utenteId : String , 
    poiId : String 
}));