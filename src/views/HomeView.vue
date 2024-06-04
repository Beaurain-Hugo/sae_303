<script setup>


</script>

<template>
  <main>
    <h1>SAE 303 | Concevoir des visualisations de données</h1>
    <h2>Ce que vous trouverez dans cette SAE :</h2>
    <ul class="style">
      <li><h3><RouterLink class="routerlink" to="/cine">Cinémas</RouterLink></h3></li>
      <li>Carte</li>
      <li>Bar</li>
      <li><h3><RouterLink class="routerlink" to="/musee">Musées</RouterLink></h3></li>
      <li>Carte</li>
      <li>Radar</li>
      <li><h3><RouterLink class="routerlink" to="/festival">Festivals</RouterLink></h3></li>
      <li>Carte</li>
      <li>Doughnut</li>
      <li>PolarArea</li>
    </ul>
  </main>
</template>

<style scoped>
.style{
  list-style:none;
}
.routerlink{
  color:white;
  text-decoration:none;

}

</style>
