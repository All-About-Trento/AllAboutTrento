const express = require('express');
const router = express.Router();
const Review = require('./models/review');
const Utente = require('./models/utenti');
const Poi = require('./models/poi');

//get all review
router.get('', async (req, res) => {
    let reviews;
    if (req.query.utenteId){
        reviews = await Review.find({
            utenteId: req.query.utenteId
        }).exec();
    }
    else{
        reviews = await Review.find({}).exec();
    }
    
    reviews = reviews.map((dbEntry) => {
        return {
            self: 'reviews/' + dbEntry.id,
            titolo : dbEntry.titolo,
            descrizione : dbEntry.descrizione,
            valutazione : dbEntry.valutazione,
            utente: 'utentis/' + dbEntry.utenteId,
            poi: 'pois/' + dbEntry.poiId
        };
    });

    res.status(200).json(reviews);
});

//get review with id
router.get('/:id', async (req, res) => {
    let reviews = await Review.find({utenteId : req.params.id});
    reviews = reviews.map((dbEntry) => {
        return {
            self: 'reviews/' + dbEntry.id,
            titolo : dbEntry.titolo,
            descrizione : dbEntry.descrizione,
            valutazione : dbEntry.valutazione,
            utente: 'utentis/' + dbEntry.utenteId,
            poi: 'pois/' + dbEntry.poiId
        };
    });

    res.status(200).json(reviews);
});

//post a new review
router.post('', async (req, res) => {
    let poiUrl = req.body.poi;
    let utenteId = req.body.utente;
    let utente = null;
    try {
        utente = await Utente.findById(utenteId);
    } catch (error) {}

    if (utente == null) {
        res.status(400).json({ error: 'Utente non esistente' });
        return;
    };

    let poiId = poiUrl.substring(poiUrl.lastIndexOf('/') + 1);
    let poi = null;
    try {
        poi = await Poi.findById(poiId).exec();
    } catch (error) {}

    if (poi == null) {
        res.status(400).json({ error: 'Poi non esistente' });
        return;
    };

    let review = new Review({
        titolo : req.body.titolo,
        descrizione : req.body.descrizione,
        valutazione : req.body.valutazione,
        utenteId: utenteId,
        poiId: poiId,
    });

    review = await review.save();

    let reviewId = review.id;

    res.location("reviews/" + reviewId).status(201).send();
});

//delete a review
router.delete('/:id', async (req, res) => {
    let review = await Review.findById(req.params.id).exec();
    if (!review) {
        res.status(404).send()
        console.log('review not found')
        return;
    }
    await review.deleteOne()
    res.status(204).send()
});

module.exports = router;