<script setup>
// Import des éléments utiles à vue
import { ref, reactive, onMounted, toRef } from 'vue'

// Import des fonctions de serviceAjax.js
import { getFest } from '@/composables/serviceAjax.js'

// Import des fonctiosns de utilsApp.js
import {getLabels, countDatas} from '@/composables/utilsApp.js'

// Import des fonctiosn de commonChart.js
import {densite, aleatoire} from '@/composables/commonChart.js'

// Import d'un graphique de type barchart
import { PolarArea } from 'vue-chartjs'

 // Import des objets de la bibliothèque ChartJs
 import {Chart as ChartJS, Title, Tooltip, Legend, ArcElement,  RadialLinearScale } from 'chart.js';

// Eléments utilisés par le graphique
ChartJS.register(Title, Tooltip, Legend, ArcElement,  RadialLinearScale);
// Propriétés du grpahique utilisées dans le template
// On définit pour chacune son type de données et sa valeur par défaut
// On peut utiliser une grande variété de type, voire des objets
const propChart = defineProps({
    chartId: {type:String, default:'polar-chart'}, // Id du graphique
    datasetIdKey: {type:String, default:'label'}, // Id du dataSet
    width: {type:Number, default:500}, // Largeur du graphe
    height: {type:Number, default:500}, // Hauteur du graphe
    cssClasses: {type:String, default:''}, // Classe Css utilisées
    styles: {type:Object, default:() => {}}, // Styles utilisés
    plugins: {type:Object, default:() => {}}, // Plugins utilisés
})

// Données injectées dans le graphe
// Au moins déclarer les structures de base
let chartData = reactive ({
    // Etiquette de l'axe
    labels: [],
    // Valeur des données du graphique
    datasets:[{}]
})

// Options du graphique
// Au moins déclarer les structures de base
let chartOptions = reactive({
    // Aspect responsive du graphique
    responsive: true,
    // Maintien du ratio
    maintainAspectRation:false,
    plugins:{
        title:{
            text:null,
            display:true
        }
    }
})

    let items = ref()
    let dataView=ref('')
    let numDataset=0
    let titleGraph=ref('')


// Sélection mdoe aléatoire / dégradé
let modeSelected = ref()
    modeSelected.value = false
    // Couleur de base
    let baseColor = ref()
    const selectMode = () => {
            let bgColor = null 
            let bdColor = null
            if(modeSelected.value){
                // Couleurs aléatoires
                [bdColor, bgColor] = aleatoire(chartData.labels)
            }else{
                // Couleur densité
                [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data)
            }
            chartData.datasets[0].backgroundColor = bgColor
            chartData.datasets[0].borderColor = bdColor
            chartData.datasets[0].borderWidth = 1
        }

        // Initialisation de l'animation d'attente
    // Au départ on a pas reçu les données donc false
    // Passe à vrai à la réception de celles-ci
    let loading = ref()
    loading.value = false


onMounted( async () => {
    await getFest()
        .then(response => {
            items.value = response.records
            dataView.value = 'fields.discipline_dominante#1'
            numDataset = 0
            titleGraph.value = "Nombre de festivals par rapport à leur discipline dominante"
            chartOptions.plugins.title.text = titleGraph
            chartData.labels = getLabels(items.value, dataView.value)
            chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)
            baseColor.value = 'rgba(255, 0, 0, #deg#)'     
            // Arrêt animation attente
            loading.value = true
        })
        selectMode()
})

</script>

<template>
    <section>
        <div v-if="loading">
            <form class="navbar-nav ml-auto">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="modeSelected" @change="selectMode">
                    <label class="custom-control-label" for="customSwitch1">dégradé / aléatoire</label>
                </div>
            </form>
        <PolarArea class="fondBlanc"

    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
    />  
</div>
<div v-else>
    <img src="@/assets/loading-48.gif" class="img-fluid">

</div>
    </section>
</template>

<style scoped>
.fondBlanc {
    background-color: white;
}
</style>