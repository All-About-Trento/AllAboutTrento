const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const tokenChecker = require('./tokenChecker.js');

const utenti= require('./utenti.js');
const poi= require('./poi.js');
const review= require('./review.js');

const autenticazione = require('./autenticazione.js');
const mongoose = require('mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('../swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

const port = process.env.PORT || 8080;
app.locals.db = mongoose.connect('mongodb+srv://AllAboutTrento:AllAboutTrento@cluster0.52cjtn7.mongodb.net/AllAboutTrento', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        console.log("Connected to Database");

        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

});

app.use('/autenticazione', autenticazione);
app.use('/utentis/me', tokenChecker);

//resourse routing
app.use('/pois', poi);
app.use('/utentis', utenti);
app.use('/reviews', review);


module.exports = app;