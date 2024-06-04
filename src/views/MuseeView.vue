<script setup>
    import RadarMusee from '@/components/RadarMusee.vue'
    import MapMusee from '@/components/MapMusee.vue'
</script>

<template>
    <main>
        <MapMusee />
        <hr/>
        <p>Ce graphique représente le nombre de musées par région. L'afficher sous la forme de radar permet de voir les différences de 
            proportions selon les régions.
        </p>
        <RadarMusee />
    </main>
</template>