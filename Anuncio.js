const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnnunciSchema = new Schema({
    titolo: String,
    dataInserimento: Date,
    descrizione: String,
    nome:String,
    cognome: String,
    telefono: String,
    email: String,
    codiceUnivoco: String
});

// Crea il modello di annuncio
const Annuncio = mongoose.model('Annuncio', AnnunciSchema);
module.exports = Annuncio;