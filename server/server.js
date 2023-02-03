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

app.use(cors());

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('../swagger.json');
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

mongoose.connect(
    process.env.MONGODB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify:false },
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port' + listener.address().port)
})

app.use('/autenticazione', autenticazione);
app.use('/utentis/me', tokenChecker);

//resourse routing
app.use('/pois', poi);
app.use('/utentis', utenti);
app.use('/reviews', review);


