const express = require('express');
const router = express.Router();
const Utenti = require('./models/utenti');
const jwt = require('jsonwebtoken');

router.post('', async function(req, res) {
	
	// find the user
	let utente = await Utenti.findOne({
		email: req.body.email
	}).exec();
	
	// user not found
	if (!utente) {
		res.json({ success: false, message: 'Utente non trovato' });
		console.log("Utente non trovato");
	}
	else if (utente.password != req.body.password) {
		res.json({ success: false, message: 'Password Sbagliata'});
		console.log("passoword sbagliata");
	}
	else{
		var payload = {
			email: utente.email,
			id: utente.id	
		}
		var options = {
			expiresIn: 86400 // expires in 24 hours
		}
		var token = jwt.sign(payload, process.env.SUPER_SECRET, options);

		res.json({
			success : true,
			nome : utente.nome,
			ruolo : utente.ruolo,
			message: 'Token!',
			token: token,
			email: utente.email,
			id: utente.id,
			self: "/"+ utente.id
		});
	}
});

module.exports = router;