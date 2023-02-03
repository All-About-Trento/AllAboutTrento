const express = require('express');
const router = express.Router();
const Poi = require('./models/poi');

//get all poi
router.get('', async (req, res) => {
    let pois = await Poi.find({});
    pois = pois.map( (poi) => {
        return {
            self: 'pois/' + poi.id,
            nome: poi.nome,
            tipologia : poi.tipologia,
            descrizione : poi.descrizione,
            posizione : poi.posizione, 
            stato : poi.stato,
            orari_apertura : poi.orari_apertura,
            immagine : poi.immagine
        };
    });
    res.status(200).json(pois);
});

//get poi
router.get('/:id', async (req, res) => {
    let poi = await Poi.findById(req.params.id);
    res.send({
        id : req.params.id,
        nome : poi.nome,
        tipologia : poi.tipologia,
        descrizione : poi.descrizione,
        posizione : poi.posizione, 
        stato : poi.stato,
        orari_apertura : poi.orari_apertura,
        immagine : poi.immagine
    });
});


//post a new poi
router.post('', async (req, res) => {
	let poi = new Poi({
        nome : req.body.nome,
        tipologia : req.body.tipologia,
        descrizione : req.body.descrizione,
        posizione: req.body.posizione,
        stato : req.body.stato,
        orari_apertura : req.body.orari_apertura,
        immagine : req.body.immagine
    });
    
	poi = await poi.save();
    let poiId = poi.id;
    console.log('Poi salvato');
    res.location("pois/" + poiId).status(201).send();
});

//delete a poi
router.delete('/:id', async (req, res) => {
    let poi = await Poi.findById(req.params.id).exec();
    if (!poi) {
        res.status(404).send()
        console.log('Poi non trovato')
        return;
    }
    await poi.deleteOne()
    console.log('Poi rimosso')
    res.status(204).send()
});

//modifica poi
router.put('/:id', async (req, res) => {
    let poi = await Poi.findById(req.params.id);
    if(poi){
        let poiUpdate = await Poi.findByIdAndUpdate(req.params.id,{$set:{nome:nome , descrizione:descrizione , posizione:pos , stato:stato , orari:orari_apertura}},{new:true,runValidators:true});
        res.status(201).send();   
    }
    else{
        res.status(204).send();
    } 
});

module.exports = router;