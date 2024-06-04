<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<div class="container-fluid">
  <nav class="navbar navbar-expand-lg navbar-dark justify-content-between">
     <RouterLink class="navbar-brand" to="/">SAE 303</RouterLink>

     <button class="navbar-toggler" 
       type="button" data-toggle="collapse" 
       data-target="#navbarNav" 
       aria-controls="navbarNav" 
       aria-expanded="false" 
       aria-label="Toggle navigation">
         <span class="navbar-toggler-icon"></span>
     </button>

     <div class="collapse navbar-collapse" id="navbarNav">
 
         <ul class="navbar-nav">              
             <li class="nav-item">
                 <RouterLink class="nav-link" to="/cine">Cinémas</RouterLink>
             </li>
             <li class="nav-item">
                <RouterLink class="nav-link" to="/musee">Musées</RouterLink>
             </li>
             <li class="nav-item">
                <RouterLink class="nav-link" to="/festival">Festivals</RouterLink>
             </li>
         </ul >

     </div>

  </nav>

  <RouterView />
</div>
</template>

