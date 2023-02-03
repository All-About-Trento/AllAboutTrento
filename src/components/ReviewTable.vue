<script setup>
import { ref, onMounted, watch } from 'vue'
import { loggedUser } from '../states/loggedUser.js'
import { pois, fetchPois, createPoi, deletePoi } from '../states/poi.js'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`
const POIS_URL = HOST+'/pois'
const REVIEWS_URL = HOST+'/reviews'

const reviews = ref([])

onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
  loggedUser.email = $cookies.get("email");
  loggedUser.nome = $cookies.get("nome");
  loggedUser.id = $cookies.get("id");
  fetchData()
  fetchPois()
})

watch(loggedUser, (_loggedUser, _prevLoggedUser) => {
  fetchPois()
  fetchData()
})

async function fetchData() {
  if (!loggedUser.token) {
    reviews.value = [];
    return;
  }
  const url =HOST+'/reviews/' + loggedUser.id
  console.log(url);
  reviews.value = await (await fetch(url)).json();
}


async function deleteReview(review) {
  fetch(HOST+"/"+review.self, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'x-access-token': loggedUser.token }
  })
  .then(() => {
    fetchData();
  })
  .catch( error => console.error(error));
};


</script>

<template>
  <span v-if="loggedUser.token"> Queste sono le tue reviews , {{loggedUser.nome}}: </span>
  <span v-if="!loggedUser.token" style="color: red">Esegui il login per visualizzare le tue reviews! </span>
  <ul>
    <li v-for="review in reviews" :key="review.self">
      <div class="reviewDiv">
        <p>{{ ( pois.value.find(b=>b.self==review.poi) || {nome: 'unknown'} ).nome}}</p>
        <a>{{ review.descrizione }} &ensp;</a> 
        <a>Valutazione : {{ review.valutazione }} &ensp;</a> 
        <button @click="deleteReview(review)">DELETE</button>
      </div>
    </li>
  </ul>
</template>
