<script setup>

   // Import des éléments utiles à vue
    import { ref, reactive, onMounted } from 'vue'

    // Import des fonctions de serviceAjax.js
    import { getCines } from '@/composables/serviceAjax.js'

    // Import des fonctiosns de utilsApp.js
    import {getLabels, countDatas} from '@/composables/utilsApp.js'

    // Import des fonctiosn de commonChart.js
    import {densite, aleatoire} from '@/composables/commonChart.js'

    // Import d'un graphique de type barchart
    import { Bar } from 'vue-chartjs'
    import TableMdl from '@/components/TableMdl.vue'

    import { linearData, filterColumn } from '@/composables/utilsTable.js'
    
     // Import des objets de la bibliothèque ChartJs
     import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

    // Eléments utilisés par le graphique
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    // Propriétés du grpahique utilisées dans le template
    // On définit pour chacune son type de données et sa valeur par défaut
    // On peut utiliser une grande variété de type, voire des objets
    const propChart = defineProps({
        chartId: {type:String, default:'bar-chart'}, // Id du graphique
        datasetIdKey: {type:String, default:'label'}, // Id du dataSet
        width: {type:Number, default:350}, // Largeur du graphe
        height: {type:Number, default:700}, // Hauteur du graphe
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

// Sélection mdoe aléatoire / dégradé
let modeSelected = ref()
    modeSelected.value = false
    // Couleur de base
    let baseColor = ref()
    baseColor.value = 'rgba(255, 0, 0, #deg#)'

    let items = ref()
    let itemsSvg = ref()

    let fieldsCines = ref()
    fieldsCines.value = [
        {   key:'fields.nom',                   label:'Nom',                    type:'string',            sortable:true,         sort:1, filter:""},
        {   key:'fields.fauteuils',             label:'Nombre de fauteils',     type:'number',            sortable:true,         sort:1, filter:""},
        {   key:'fields.ecrans',                label:"Nombre d'écrans",        type:'number',            sortable:true,         sort:1, filter:""},
    ]

    // Initialisation
    let fields=ref()                // Champs du tableau
    let title=ref()                 // Titre du tableau
    let color=ref()                 // couleur du texte du tableau
    let dataView=ref('')            // Valeurs de données sélectionnées pour visualisaiton
    let numDataset=0                // N° de données dans le dataset
    
     // Initialisation de l'animation d'attente
    // Au départ on a pas reçu les données donc false
    // Passe à vrai à la réception de celles-ci
    let loading = ref()
    loading.value = false

    const updateGraph = (items) => {
        //    Recherche de labels
        chartData.labels = getLabels(items.value, dataView.value)
        // Comptage
        chartData.datasets[numDataset].data = countDatas(items.value, chartData.labels, dataView.value)
        // Appel fonction de sélection du type de coloration
        selectMode()
        // Arrêt animation attente
        loading.value = true
    }
    const selectMode = () => {
            let bgColor, bdColor
            if(modeSelected.value){
                // Couleurs aléatoires
                [bdColor, bgColor] = aleatoire(chartData.labels)
            }else{
                // Couleur densité
                [bgColor, bdColor] = densite(baseColor.value, chartData.datasets[0].data)
            }
            chartData.datasets[0].backgroundColor = bgColor
            chartData.datasets[0].borderColor = bdColor
        }
onMounted(async() => {        
  await getCines()
        .then(response => {
                    items.value = response.records
                    
                    dataView.value = 'fields.region_administrative#1'
                    numDataset = 0
                    chartOptions.plugins.title.text = 'Nombre de cinémas par région'
                    title.value = chartOptions.plugins.title.text
                    chartData.datasets[0].label = "Nombre de cinémas"
                    baseColor.value = 'rgba(0,0,255,#deg#)'
                    fields.value = fieldsCines.value
                    color.value = "color:blue;"
        })
        items.value = linearData(fields.value, items.value)
        itemsSvg.value = items.value
        updateGraph(items)
    })

    const tableFilter = (field) => {
        items.value = filterColumn(field, itemsSvg.value)
        updateGraph(items)
    }
    
</script>

<template>
    <section>
    <div v-if="loading">
        <form class="navbar-nav ml-auto">
                <div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="modeSelected" @change="selectMode">
                    <label class="custom-control-label" for="customSwitch1">dégradé/aléatoire</label>
                </div>
            </form>
        <Bar class="fondBlanc"
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
            <hr/>
        <TableMdl class="fondBlanc"
            :title="title" 
            :fields="fields" 
            :items="items" 
            :itemsSvg="itemsSvg"
            :color="color" 
            @tableFilter="tableFilter"
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
