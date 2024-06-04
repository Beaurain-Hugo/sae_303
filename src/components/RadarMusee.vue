<script setup>
   // Import des éléments utiles à vue
    import { ref, reactive, onMounted } from 'vue'

    // Import des fonctions de serviceAjax.js
    import { getMusees } from '@/composables/serviceAjax.js'

    // Import des fonctiosns de utilsApp.js
    import {getLabels, countDatas} from '@/composables/utilsApp.js'

    // Import des fonctiosn de commonChart.js
    import {densite, aleatoire} from '@/composables/commonChart.js'

    // Import d'un graphique de type barchart
    import { Radar } from 'vue-chartjs'
 
    
// Import des objets du graphique de la bibliothèque ChartJs
    // Voir documentation pour descriptif des éléments
    import { Chart as ChartJS, Title, Tooltip, Legend,  PointElement, LineElement, 
            RadialLinearScale, Filler } from 'chart.js'

    // Eléments utilisés par notre graphique registration pour Vue-chart
    ChartJS.register(Title, Tooltip, Legend, PointElement, LineElement, 
        RadialLinearScale, Filler )
    // Propriétés du grpahique utilisées dans le template
    // On définit pour chacune son type de données et sa valeur par défaut
    // On peut utiliser une grande variété de type, voire des objets
 const propChart = defineProps({
        chartId:            { type: String,         default: 'radar-chart'    }, // Id du graphique
        datasetIdKey:       { type: String,         default: 'label'          }, // id du dataSet
        width:              { type: Number,         default: 100              }, // Hauteur du graphe
        height:             { type: Number,         default: 100              }, // Largeur du graphe
        cssClasses:         { type: String,         default: ''               }, // Classes css utilisées
        styles:             { type: Object,         default: () => {}         }, // Styles utilisés
        plugins:            { type: Object,         default: () => {}         }  // plugins utilisés
    })

// Données injectées dans le graphique
    // données de tests écrassées par la suite par les données réelles
    let chartData = reactive({
        // Etiquettes l'axe 
        labels: [],
        // Valeurs des données du graphique
        // 3 datasets, en un premier temps les données sont statiques (jeux de test)
        // Elles seront écrasées par les données réelles provenant de l'API
        datasets: [
            {label: 'Nombre de musées', borderColor: 'rgba(255, 0, 0, 1)', backgroundColor: 'rgba(255, 0, 0, 0.1)'},
        ]
    });

    // Options du graphique
    // Les principales utilisées, ils en existe beaucoup d'autres
    // voir documentation
    let chartOptions = reactive({ 
        // Aspect responsive du graphique
        responsive: true,  
        maintainAspectRation:true,
        // Echelles
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 100
            },
        },
         // Les plugins
         plugins:{
            // Titre du graphique      
            title:{
                display:true,
                text : null,
               
        } 
    }});

    let items = ref()
    let dataView=ref('')  
    let numDataset=0   // N° de données dans le dataset
   
    onMounted(async() => {
        await getMusees()
        .then(response => {
            items.value = response.records
            dataView.value = 'fields.region_administrative#1'
            numDataset = 0  
            chartOptions.plugins.title.text = 'Nombre de musées par rapport à la région administrative'

            chartData.labels = getLabels(items.value, dataView.value)
            chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)

        })
    }) // fin onMounted
    
</script>

<template>
  <section>
    
<div class="container-fluid">
        <div>
            <div class="container">
            <Radar class="fondBlanc"
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
        </div>
    </div>


  </section>
</template>

<style scoped>
    .fondBlanc{
        background-color: white;
    }
</style>

