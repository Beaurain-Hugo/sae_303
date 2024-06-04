// Fonction de calcul sur une base de couleur avec densité
export const densite = (base, data) => {
    // Calcul des valeurs extrêmes des données
    // valeur mini et maxi
    let valMax = 0
    let valMin = 9999
    // parcours des données
    data.forEach((val) => {
        if (val < valMin) {
            valMin = val
        }
        if (val > valMax) {
            valMax = val
        }
    })
    // On utilise une densité de 10% à 90%
    // la différence est de 80% soit 0.8
    // On découpe ce pourcentage en fonction
    // des valeurs extrêmes (mini et maxi)
    let nbVal = 0.8 / (valMax - valMin)
    // Tableau des valeurs à retourner
    let tabVal = []
    let tabBorder = []
    // densité de départ : 10%
    let deg = 0.1
    // Parcours des données
    data.forEach((val) => {
        // calcul de la transparence pour cette valeur
        // Echelle de découpage x valeur actuelle +10% (départ)
        let transp
        if (valMin < valMax) { transp = nbVal * val * 0.8 + deg }
        else (transp = val * 0.7)
        // mise à jour de la transparence
        let color = base.replace('#deg#', transp)
        let border = base.replace('#deg#', 1)
        // Ajout dans le tableau des couleurs
        tabVal.push(color)
        tabBorder.push(border)
    })
    return [tabVal, tabBorder]
}

// Fonction de calcul aléatoire descouleurs type rgba
// Non exportable, car utilisée par une fonction interne
const couleur = (max) => {
    return Math.round(Math.random() * (max), 0);
}

export const aleatoire = (labels) => {
    let bdColor = []
    let bgColor = []
    labels.forEach(function (val) {
        // On calcule la couleur du secteur
        let c1 = couleur(255)
        let c2 = couleur(255)
        let c3 = couleur(255)
        let tr = 0.5
        // Couleur avec transparence
        let color = 'rgba(' + [c1, c2, c3, tr].join(',') + ")"
        bgColor.push(color)
        // Bordure sans transparence
        let border = 'rgba(' + [c1, c2, c3].join(',') + ")"
        bdColor.push(border)
    })
    return [bgColor, bdColor]
}