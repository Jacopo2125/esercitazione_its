// Importare le dipendenze
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const AnnuncioModel = require("./models/Annuncio")

const host = "127.0.0.1";
const port = 4000;

const app = express();
app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb+srv://Jacopo_22:v077fEfsXypIN4Ys@cluster0.p3ipjq5.mongodb.net', {useNewUrlPrse: true}, () => {
    console.log("Sono connesso al Database con successo!");
})
app.listen(port, host, () => {
    console.log(`Sono in ascolto sulla porta ${port}`)
})


//----------- ROTTE: creazione di un annuncio--------------------

app.post('/nuovoAnnuncio', async (req, res) => {
const nuovoAnnuncio= new Annuncio(req.body);
nuovoAnnuncio.dataInserimento= new Date();
nuovoAnnuncio.codiceUnivoco=Math.random();
try 
{
    let risultato= await nuovoAnnuncio.create(annuncio);
    res.json({ codiceUnivoco: nuovoAnnuncio.codiceUnivoco });
}catch (error) {
    res.render("errore",{
        messaggio: "riprova! Qualcosa è andato storto!"
    })  
}
});

//----------- ROTTE:eliminazione di un annuncio--------------------

app.delete('/eliminAnnuncio/:codiceUnivoco', async (req, res) => {
let codiceUnivoco=req.params.codiceUnivoco;
try {
    let annunci= await AnnuncioModel.findOneAndDelete({ codiceUnivoco });
    res.render('fatto!!', {
        messaggio: "Annuncio eliminato!" });
}catch (error) {
    res.render("errore",{
        messaggio: "riprova! eliminazione non è andato a buon fine!"
    })        
}

});

