// Services d'appels Ajax via fetch
// les fonctions sont exportables
// afin de permettre leur réutilisation dans un programme externe
// (réutilisable par import)

// Promesse de recherche pour les villageois
export const getCines = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=etablissements-cinematographiques&q=&rows=10000'
    // Requête concernée
    return fetch(rq) // On renvoie la requpete à qui la demande
        .then(response => {
            return response.json()      // On envoie le résultat de la requête en json
        })
        .catch(error => { throw error }) // Cas d'erreur
}

// Promesse de recherche pour les vidéos
export const getMusees = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=liste-et-localisation-des-musees-de-france&q=&rows=10000'
    // Requête concernée
    return fetch(rq) // On renvoie la requpete à qui la demande
        .then(response => {
            return response.json()      // On envoie le résultat de la requête en json
        })
        .catch(error => { throw error }) // Cas d'erreur
}

// Promesse de recherche pour les villageois
export const getFest = () => {
    let rq = 'https://data.culture.gouv.fr/api/records/1.0/search/?dataset=festivals-global-festivals-_-pl&q=&rows=10000'
    // Requête concernée
    return fetch(rq) // On renvoie la requpete à qui la demande
        .then(response => {
            return response.json()      // On envoie le résultat de la requête en json
        })
        .catch(error => { throw error }) // Cas d'erreur
}