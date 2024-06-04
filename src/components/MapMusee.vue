<script setup>
    // Import éléments de vue
    import {onMounted, ref, reactive} from 'vue'
    // Import leaflet
    import * as Leaflet from 'leaflet'
    // css leaflet 
    import 'leaflet/dist/leaflet.css'

    // Canevas leaflet pour la carte
    let tileLayer = Leaflet.tileLayer
    // Initialisation de la carte sous forme de ref
    let map = ref()

    // Liste des départements   
    let listeDep = ref()

    // Département sélectionné
    let depSelect = ref()

    // Liste des gares d'un département
    let listeMusees = ref()

    // Lorsque le composant est monté dans la vue
    // On affiche la carte
    onMounted( async () => {
        // Caractéristiques visuelles de la carte
        tileLayer = Leaflet.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            }
        );

        // Création de la carte sur la div ayant : id='map'
        map = Leaflet.map('map',
        {
            zoomControl:true,        // Contrôle du zoom
            layers: [tileLayer],    // Canevas pour dessiner la carte
            maxZoom:18,             // Zoom maxi autorisé
            minZoom:6               // Zoom mini autorisé
        })
        // Projection de la carte avec centrage aux coordonées indiquées, avec facteur d'agrandissement
        .setView([47.495328, 6.8044455], 17)

        // Recherche des départements - geo api gouv
        await fetch ('https://geo.api.gouv.fr/departements')
        // Réponse demandée en json
        .then(response => response.json())
        // Récupération del a réponse
        .then(response => {
            listeDep.value = response;
            // On vérifie dans la console l'obtention des résultats
            console.log("Liste des départements", listeDep)
            // Valeur 0 par défaut : Sélectionner un département
            depSelect.value="0"
        })
        .catch(error => console.log('ereur Ajax'))

    })
        

        // Fonction de sélection du département
        const selection = async (dep) => {
            console.log("département selectionné", dep)
            // Requête Sncf
            let request = 'https://data.culture.gouv.fr/api/records/1.0/search/'
            +'?dataset=liste-et-localisation-des-musees-de-france'
            +'&q=departement='+dep
            +'&rows=10000'
        console.log("request", request)
        // Recherche des départements - api gouv
        await fetch(request)
        // Réponse demandée en json
        .then(response => response.json())
        // Récupération de la réponse
        .then(response => {
            // Récupération de la liste des gares
            listeMusees.value = response.records;
            // On vérifie dans la console l'obtention des résultats
            console.log("Liste des musées", listeMusees);
            // Instanciation des markers
            // Calque FeatureGroup - groupe de calques (markers)
            let markers = Leaflet.featureGroup();
            // Création d'un icone, le même pour tous
            let myIcon = Leaflet.icon({iconUrl: 'images/marker-icon.png', 
                shadowUrl: 'images/marker-shadow.png', iconSize: [25,41], shadowSize: [25,41],
                iconAnchor: [0,0], shadowAnchor:[-10, -10], popupAnchor:[0,0]});
            // Parcours des gares
            listeMusees.value.forEach( (musee) =>{
                // Récupération des coordonées de la gare
                let position = musee.geometry.coordinates;
                // Nom de la commune
                let libelle = musee.fields.nom_officiel_du_musee;
                // Ajout d'un marqueur
                // Attention latitude / longitude inversées dans les données
                let marker = Leaflet.marker([position[1], position[0]], {icon: myIcon});
                // Ajout d'une infobulle
                marker.bindPopup(libelle);
                // Ajout au tableau de markers
                markers.addLayer(marker);
            })
            // Ajout des markers à la carte
            map.addLayer(markers);
            // Positionnement sur l'ensemble des markers
            // la fonction fitbounds permet de repositionner sur la carte
            // sur le centre de l'ensemble de latitude/longitude
            // la fonction getBounds permet de donner les deux points extrêmes
            // (rectangle) de l'ensemble des marqueurs
            map.fitBounds(markers.getBounds());
        })
        .catch(error => console.log('erreur Ajax', error))

        }
</script>

<template>
    <section>
        <div class="container">
            <select class="custom-select" v-model="depSelect" @change="selection(depSelect)">
                <option disable value="0">Sélectionner un département</option>
                <option v-for="dep in listeDep" :key="dep.code" :value="dep.nom">
                    {{dep.code}} - {{dep.nom}}
                </option>
            </select>
            <hr/>
            <div id="map">

            </div>
        </div>
    </section>
</template>

<style scoped>
    #map{
        width:100%;
        height:70vh;
    }
</style>