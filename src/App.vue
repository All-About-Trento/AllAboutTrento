<script setup>
import {RouterLink , RouterView} from 'vue-router'
import Login from '@/components/Login.vue'

import{ref , onMounted} from 'vue'

import {
  loggedUser,
  setLoggedUser,
  clearLoggedUser,
} from "./states/loggedUser.js";

onMounted( () => {
  loggedUser.token = $cookies.isKey("email");
})
</script>


<template>
  <header>
    <div class="topnav">
      <div class="routing">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/pois">Poi</RouterLink>
        <RouterLink to="/reviews">Review</RouterLink>
        <div v-if="!loggedUser.token" class="routing">
          <RouterLink to="/register">Register</RouterLink>
        </div>
        <div v-if="loggedUser.token" class="routing">
          <RouterLink to="/profile">Profilo</RouterLink>
        </div>
      </div>
      <div class="login">
        <a><Login /></a>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import '@/assets/base.css';
.topnav {
  background-color: #333;
  overflow: hidden;
}

.router-link-active{
  background-color: #999494;
  float: left;
}

/* Style the links inside the navigation bar */
.topnav .routing a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 25px;
}

.topnav .login{
  float: right;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 25px;
}

.topnav .login a{
  color: white;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #999494;
  color: white;
}

/* Add a color to the active/current link */
.topnav a.home {
  background-color: blue;
  color: white;
}



</style>
