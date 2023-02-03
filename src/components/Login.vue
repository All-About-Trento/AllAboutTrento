<script setup>
import { ref, onMounted } from "vue";
import {
  loggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "../states/loggedUser.js";

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`;

const email = ref('');
const password = ref('');
const cookie = ref('');

const emit = defineEmits(["login"]);

onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
  loggedUser.nome = $cookies.get("nome");
  loggedUser.email = $cookies.get("email");
  loggedUser.ruolo = $cookies.get("ruolo");
  loggedUser.self = $cookies.get("self");

})

function login() {
  fetch(HOST+"/autenticazione", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((resp) => resp.json())
    .then(function (data) {
      setLoggedUser(data);
      emit("login", loggedUser);
      console.log(loggedUser.successo);
      if(loggedUser.successo){
        location.reload();
      }
      return;
    })
    .catch((error) => console.error(error)); 
}

function logout() {
  clearLoggedUser();
  location.replace("http://localhost:5173");
}


</script>

<template>
  <form>
    <span v-if="loggedUser.token">
      {{ loggedUser.nome }} &ensp;<button type="button" @click="logout">LogOut</button>
    </span>
    <span v-if="!loggedUser.token">
    
      Email  <input name="email" v-model="email" placeholder="Insert email"/> &ensp;
      Password  <input name="password" type="password" v-model="password" placeholder="Insert password"/>&ensp;
      <button type="button" @click="login">Login</button>
      <p v-if="!loggedUser.successo" style="color:red"><i>{{loggedUser.message}}</i></p>
    </span>

  </form>
</template>

<style>
@import '@/assets/base.css';
</style>
