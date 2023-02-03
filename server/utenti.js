const express = require('express');
const router = express.Router();
const Utenti = require('./models/utenti');


//login
router.get('/me', async (req, res) => {
    

    let utenti = await Utenti.findOne({email: req.loggedUser.email});

    res.status(200).json({
        self: 'utentis/' + utenti.id,
        email: utenti.email
    });
});

//get all utenti
router.get('', async (req, res) => {
    let utentis;

    if(req.query.email){
        utentis= await Utenti.find({email:req.query.email}).exec();
    }
    else
    {
        utentis = await Utenti.find().exec();
    }

    utentis = utentis.map( (utenti) => {
        return {
            self : 'utentis/'+utenti.id,
            nome: utenti.nome,
            cognome : utenti.cognome,
            email :utenti.email,
            numTelefono : utenti.numTelefono,
            password : utenti.password
        };
    });
    res.status(200).json(utentis);
});

//get with the id
router.get('/:id', async (req, res) => {
    let utente = await Utenti.findById(req.params.id);
    res.send({
        id : req.params.id,
        nome : utente.nome,
        cognome : utente.cognome,
        email : utente.email,
        numTelefono : utente.numTelefono,
        password : utente.password,
        ruolo : utente.ruolo
    });
});

//post a new utente 
router.post('', async (req, res) => {
	let utenti = new Utenti({
        nome : req.body.nome,
        cognome : req.body.cognome,
        email : req.body.email,
        numTelefono : req.body.numTelefono,
        password : req.body.password,
        ruolo : req.body.ruolo
    });
    
    utenti = await utenti.save();
    let utentiId = utenti.id;
    console.log('Utente saved successfully');
    res.json({
        nome : req.body.nome,
        cognome : req.body.cognome,
        email : req.body.email,
        numTelefono : req.body.numTelefono,
        password : req.body.password,
        ruolo : req.body.ruolo
    })
    res.location("utentis/" + utentiId).status(201).send();
});

router.put('/:id', async (req, res) => {
    let utente = await Utenti.findById(req.params.id);
    if(utente.password == req.body.oPassword){
        let utenteUpdate = await Utenti.findByIdAndUpdate(req.params.id,{$set:{password:req.body.nPassword}},{new:true,runValidators:true});
        res.status(201).send();   
    }
    else{
        res.status(204).send();
    } 
});

module.exports = router;