<script setup>
    // Import des éléments utilisés de vue
    import { reactive, ref, onMounted} from 'vue';

    // Import des fonctions de serviceAjax.js
    import { getFest} from '@/composables/serviceAjax.js'

    // Import des fonctiosns de utilsApp.js
    import {getLabels, countDatas} from '@/composables/utilsApp.js'

    // Import d'un graphique type doughnut
    import { Doughnut } from 'vue-chartjs'

    // Import des fonctiosn de commonChart.js
    import {aleatoire} from '@/composables/commonChart.js'

    // Import des objets du graphique de la bibliothèque ChartJS 
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'

    // Eléments utilisés potentiellement pour notre graphique 
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale )

    // Propriétés du graphique utilisé dans le template (props)
    // On définit pour chacune son type de données et sa valeur par défaut
    // On peut utiliser une grande variété de types, voire des objets
    const propChart = defineProps({
        chartId:                    { type: String,                         default: 'doughnut-chart'   }, // Id du graphique
        datasetIdKey:               { type: String,                         default:'label'             }, // Id du dataSet
        width:                      { type: Number,                         default:500               }, // Largeur du graphe
        height:                     { type: Number,                         default:500               }, // Longueur du graphe
        cssClasses:                 { type: String,                         default:''                  }, // Classes css utilisées
        styles:                     { type: Object,                         default: () => {}           }, // Styles utilisés
        plugins:                    { type: Object,                         default: () => {}           }  // Plugins utilisés

    })

    // Données du graphe
    // Pour l'instant juste pour tester le fonctionnement
    const chartData = reactive({
        // labels vides
        labels: [],
        datasets: [
            {   
                data:[],
                backgroundColor: [],
                borderColor:[],
                borderWidth:1
            }
        ]
    })

    // Options du graphe
    const chartOptions = reactive({
        responsive: true,
        maintainAspectRatio: false,
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



    const colorAleatoire = () => {
            let couleur = ref()

            let bgColor = null 
            let bdColor = null
            couleur.value = [bdColor, bgColor] = aleatoire(chartData.labels)
            
            chartData.datasets[0].backgroundColor = bgColor
            chartData.datasets[0].borderColor = bdColor
            chartData.datasets[0].borderWidth = 1
        }

    // Initialisation de l'animation d'attente
    // Au départ on a pas reçu les données donc false
    // Passe à vrai à la réception de celles-ci
    let loading = ref()
    loading.value = false

    // Au montage des composant
    onMounted(async() => {
        await getFest()
        .then(response => {
            items.value = response.records
            dataView.value = 'fields.region_principale_de_deroulement#1'
            numDataset = 0
            chartOptions.plugins.title.text = 'Nombre de festival par région'
            chartData.labels = getLabels(items.value, dataView.value)
            chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)
            // Arrêt animation attente
            loading.value = true
        })
        colorAleatoire()
    })

</script>

<template>
    <section>
    <div v-if="loading">
    <Doughnut class="fondBlanc"
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