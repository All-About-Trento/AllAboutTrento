<script setup>
import { ref, onMounted } from "vue";
import {
  loggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;

const nome = ref('');
const cognome = ref('');
const email = ref('');
const numTel = ref('');
const password = ref('');
const cookie = ref('');

let registerMessage= ref('');

const emit = defineEmits(["register"]);

onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
})


function register() {

  if(nome.value=="" || cognome.value=="" || numTel.value=="" || email.value=="" || password.value==""){
    registerMessage.value= "Inserisci tutti i parametri";
    return;
  }

  fetch(HOST+"/utentis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nome:nome.value , cognome:cognome.value , email: email.value , numTelefono:numTel.value, password: password.value , ruolo : "utente" }),
  })
    .then((resp) => resp.json())
    .then(function (data) {
      if(data.success){
      setLoggedUser(data);
      location.reload();
      emit("register", loggedUser);
      return;
      }
      else{
        registerMessage.value ="Email già in uso";
      }
    })
    .catch((error) => console.error(error)); 
}

</script>

<template>
  <form style="">
    <span v-if="!loggedUser.token">
      <h2>Form di Registrazione</h2>
      Nome  <input name="nome" v-model="nome" placeholder="Nome"/> <br>
      Cognome  <input name="cognome" v-model="cognome" placeholder="Cognome"/> <br>
      Numero Telefono  <input name="numerotelefono" v-model="numTel" placeholder="Numero Telefono"/> <br>
      Email  <input name="email" v-model="email" placeholder="Inserisci l' email"/> <br>
      Password  <input name="password" type="password" v-model="password" placeholder="Insert password"/><br>
      <button type="button" @click="register">Register</button><br>
      <span style="color: red"> {{registerMessage}} </span>
    </span>
  </form>
</template>

<style>
@import '@/assets/base.css';
</style>
