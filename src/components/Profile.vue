<script setup>
import { ref, onMounted, watch } from 'vue'
import { loggedUser } from '../states/loggedUser.js'

const HOST = import.meta.env.VITE_API_HOST || `http://localhost:8080`



const nome = ref('')
const cognome = ref('')
const email = ref('')
const numTelefono = ref('')
const oldPassword = ref('')
const newPassword = ref('')

const psMessage= ref('')

const utente = ref([])

onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
  loggedUser.nome = $cookies.get("nome");
  loggedUser.email = $cookies.get("email");
  loggedUser.id = $cookies.get("id");

  fetchUtente();
})

watch(loggedUser, (_loggedUser, _prevLoggedUser) => {
  psMessage.value = ''
})

async function fetchUtente() {
    const USER_URL = HOST+'/utentis/'+loggedUser.id;
    utente.value =  await (await fetch(USER_URL)).json();
}

function cambioPassword(id){

  fetch(HOST+'/utentis/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': loggedUser.token
        },
        body: JSON.stringify( { 
          oPassword:oldPassword.value , 
          nPassword : newPassword.value
        } )
    })
    .then((resp) => {
      if(resp.status==204){
        psMessage.value="Vecchia Password Sbagliata";
        return;
      }
      else{
        psMessage.value='';
        location.reload();
        return;
      }
    })
    .catch( error => console.error(error) );
}

</script>



<template>
  <div class="profilo">
    <h1>Profilo {{ utente.id }}</h1> 
    <h3>{{ utente.nome }} {{ utente.cognome }}</h3>
    <h3>Email: {{ utente.email }}</h3>
    <p>Numero Telefono : {{ utente.numTelefono }}</p>
    <p>Password : {{ utente.password }}</p>
    <p>Ruolo: {{ utente.ruolo }}</p>
    <br>
    <h2>Cambio Password</h2>
    <input v-model="oldPassword" placeholder="vecchia password"/>
    <input v-model="newPassword" placeholder="nuova password"/>
    <button @click="cambioPassword(utente.id)">Cambia</button> <br>
    <span style="color: red"> {{psMessage}} </span>
  </div>
</template>

<style>
.profilo{
  padding-top: 5px;
  padding-left: 10px;
}
</style>
