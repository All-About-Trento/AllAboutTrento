<script setup>
import { ref, onMounted, watch } from 'vue'
import { loggedUser } from '../states/loggedUser.js'
import { pois, fetchPois, createPoi, deletePoi } from '../states/poi.js'
const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`
const POIS_URL = HOST+'/pois'
const REVIEWS_URL = HOST+'/reviews'



const nome = ref('')
const tipologia = ref('')
const descrizione = ref('')
const posizione = ref('')
const stato = ref('')
const orari_apertura = ref('')
const newOrario=ref('')
const immagine = ref('')
const titolo = ref('')
const desc = ref('')
const newDesc=ref('')
const val = ref('')

const warningMessage = ref('')
const valMessage = ref('')
const reviewMessage = ref('')
const delReviewMessage = ref('')
const descMessage=ref('')
let ruoloUtente = false;
let ruoloGestore = false;
let poiSelezionato = false;
let poiSelezionato2 = ref('')
let poiSele = ref('')


onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
  loggedUser.nome = $cookies.get("nome");
  loggedUser.email = $cookies.get("email");
  loggedUser.id = $cookies.get("id");
  poiSelezionato = $cookies.isKey("poiSelezionato");
  poiSelezionato2 = $cookies.get("poiSelezionato");

  if($cookies.get("ruolo")=="gestore"){
    ruoloGestore = true;
  }
  else if($cookies.get("ruolo")=="utente"){
    ruoloUtente = true;
  }

  console.log(poiSelezionato2);
  fetchPois() // fetch on init
})

watch(loggedUser, (_loggedUser, _prevLoggedUser) => {
  warningMessage.value = ''
  descMessage.value=''
})



function createPoiButton() {
  if (nome.value=='' || tipologia.value=='' || descrizione.value=='' || posizione.value=='' || stato.value=='' || orari_apertura.value=='' || immagine.value=='') {
    warningMessage.value = 'Compila tutti i campi'
    return;
  }

  if(typeof nome.value==='string'){ }else{
    warningMessage.value = 'Nome non è in formato stringa'
    return;
  }
  if(typeof descrizione.value==='string'){ }else{
    warningMessage.value = 'Descrizione non è in formato stringa'
    return;
  }
  if(typeof posizione.value==='string'){ }else{
    warningMessage.value = 'Posizione non è in formato stringa'
    return;
  }
  if(typeof orari_apertura.value==='string'){ }else{
    warningMessage.value = 'Orari Apertura non è in formato stringa'
    return;
  }
  if(typeof immagine.value==='string'){ }else{
    warningMessage.value = 'Immagine non è in formato stringa'
    return;
  }

  warningMessage.value = ''
  createPoi(
    nome.value,
    tipologia.value,
    descrizione.value,
    posizione.value,
    stato.value,
    orari_apertura.value,
    immagine.value).catch( err => console.error(err) );
};

function deletePoiButton(poi) {
  deletePoi(poi).catch( err => console.error(err) );
  delReviewMessage.value='Delete Poi effettuata';
};

function reviewPoiButton(poi) {
  console.log(poi);
  console.log(loggedUser.id);
  if (!loggedUser.token) {
    warningMessage.value = 'Please login to review a Poi!'
    return;
  }

  if(val.value<1 || val.value>5){
    valMessage.value = 'Valore tra 1 e 5!!'
    return;
  }
  warningMessage.value = ''

  fetch(REVIEWS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { titolo: titolo.value ,descrizione:desc.value , valutazione : val.value , utente: loggedUser.id, poi: poi.self } ),
    })
    .then((resp) => {
      location.reload();
      return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
};

async function selezionaPoi(poi){
    poiSele.value =  await (await fetch(HOST+"/"+poi.self)).json();
    $cookies.set("poiSelezionato",poiSele.value,86400);
    location.reload();
    return;
}

function tornaIndietro(){
  $cookies.remove("poiSelezionato");
  $cookies.remove("poiSelezionato2");
  location.reload();
}

function stampaImg(){
  return poiSelezionato2.immagine;
}
function stampaPos(){
  return poiSelezionato2.posizione;
}

function updateDesc(id){
  fetch(HOST+'/pois/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( {
          nDesc : newDesc.value
        } )
    })
    .then((resp) => {
      if(resp.status==204){
        descMessage.value="Inserisci una stringa";
        return;
      }
      else{
        descMessage.value='';
        location.reload();
        return;
      }
    })
    .catch( error => console.error(error) );
}

</script>



<template>
  
  <div v-if="!poiSelezionato">
  <form v-if="ruoloGestore">
    <span>Insert a new poi</span>
    <br />
    <input v-model.string="nome" placeholder="nome"/>

    <select v-model="tipologia">
      <option disabled value="">Seleziona una Tipologia</option>
      <option>Monumentario</option>
      <option>Artistico</option>
      <option>Culinario</option>
    </select>

    <input v-model="descrizione" placeholder="descrizione" />
    <input v-model="posizione" placeholder="posizione"/>

    <select v-model="stato">
      <option disabled value="">Aperto o Chiuso</option>
      <option>Aperto</option>
      <option>Chiuso</option>
    </select>

    <input v-model="orari_apertura" placeholder="orari_apertura"/>
    <input v-model="immagine" placeholder="immagine"/>&ensp;
    <button type="button" @click="createPoiButton">Inserisci nuovo Poi </button>
    <br />
    <span style="color: red"> {{warningMessage}} </span>
  </form>
  
    <h1>Poi:</h1> 
    <ul>
      <li v-for="poi in pois.value" :key="poi.self">
        <button @click="selezionaPoi(poi)">{{poi.nome,poi.descrizione}}</button>
        <a  v-if="ruolo">&ensp;</a>
        <div v-if="ruoloUtente">
          <input v-model="titolo" placeholder="titolo"/>
          <input v-model="desc" placeholder="descrizione"/>
          <input v-model="val" type="number" placeholder="valutazione" min="1" max="5"/> &ensp;
          <button @click="reviewPoiButton(poi)">REVIEW</button>
        </div>
        <span style="color: red"> {{valMessage}} </span>
         &ensp; <button v-if="ruoloGestore" @click="deletePoiButton(poi)">DELETE</button><br>
        <span style="color: red"> {{reviewMessage}} </span>
      </li>
    </ul>
  </div>
  
  <div v-if="poiSelezionato">
     <h1> {{ poiSelezionato2.nome }} : {{poiSelezionato2.tipologia}}</h1>
     <h2> {{ poiSelezionato2.descrizione }}</h2>  <input v-model="newDesc" v-if="ruoloGestore" placeholder="cambia descrizione"> <button v-if="ruoloGestore" @click="updateDesc(poiSelezionato2.id)">Update</button><br><span style="color: red"> {{descMessage}} </span><br>
     <img v-bind:src ="stampaImg()" height="700" width="1200"> <br>
     <a v-bind:href="stampaPos() "  target="_blank" >Premi qui per la posizione</a>
     <h1> {{ poiSelezionato2.stato }}</h1>
     <h1> Orario di apertura : {{ poiSelezionato2.orari_apertura }}</h1>
     <button @click="tornaIndietro()"> Torna Indietro</button>
  </div>

</template>
