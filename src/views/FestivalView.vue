<script setup>
    import PieFest from '@/components/PieFest.vue'
    import PolarFest from '@/components/PolarFest.vue'
    import MapFest from '@/components/MapFest.vue'
</script>

<template>
    <main>
        <MapFest />
        <hr/>
        <p>Ce graphique représente le nombre de festivals par région. L'afficher sous la forme de doughnut permet de voir les différences de 
            proportions selon les régions. Les régions en possédant le plus sont certainement parmi celles les plus attractives, expliquant
            donc la forte présence de festivals.
        </p>
        <PieFest />
        <hr/>
        <p>Ce graphique représente le nombre de festivals selon leur discipline dominante. L'afficher sous la forme de polararea permet de 
            voir efficacement les discipline les plus représentés. Ici, la musique est en première place de très loin. 
        </p>
        <PolarFest />
        <p>Il aurait été intéressant de réaliser un troisième graphique montrant les disciplines dominantes des festivals selon les régions,
           afin de voir si les régions où se déroulent le plus de festivals sont principalement des festivals musicaux.
        </p>
    </main>
</template>