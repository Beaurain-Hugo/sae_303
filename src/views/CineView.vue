<script setup>

import MapCine from '@/components/MapCine.vue'
import BarCine from '@/components/BarCine.vue'

</script>

<template>
  <main>
    <MapCine />
    <hr/>
    <p>Ce graphique représente le nombre de cinéma par région. Il est possible de filtrer les cinémas selon leur nom, leur nombre de 
       fauteils et d'écrans. L'afficher sous la forme de bar permet de correctement comparer les régions et de voir où il y a le plus de 
       cinémas. Filtrer par nom sert surtout à montrer les régions où les groupes comme Megarama ou Gaumont sont (principalement) présents.
        Le filtre par écrans et par fauteils montre les cinémas en fonction de leur capacité et de leur taille par région. Au vu des 
        données, nous pouvons supposer que les régions avec le plus de cinémas sont celles avec le plus d'habitant et inversement.
    </p>
    <BarCine />
  </main>
</template>
