// Fonction exportable pour être réutilisée
// Permet d'obtenir une liste de labels demandés sur un flux json
// lstData : le flux concerné
// label : la rubrique demandée
// Structure du label :
//      * nom complet de la rubrique notation objet
//      * séparateur : #
//      * nombre d'occurences :
//              * 1 : unique
//              * multi : occurences multiples
export const getLabels = (lstData, label) => {
    // nb d'occure  nces des valeurs du label
    let tl = label.split('#')
    let occurence = tl[1]
    // label concerné
    let lbl = tl[0]
    // niveau des infomations du label
    let val = lbl.split(".")
    // par exemple pour laSpecialite.nom
    // On a :
    //      * val[0] : laSpecialite
    //      * val[1] : nom
    //      * val.lenght = 2
    // Tableau de renvoie des résultats
    let retour = []
    // Set pour éliminations des doublons
    let set = new Set()

    // Parcours des data
    // Si occurence multi, on utilise le tableau
    // Pour stocker toutes les valeurs multiples
    let tabObj = []

    lstData.forEach((element) => {
        // Suivant le niveau de profondeur du label
        switch (val.length) {
            // niveau de l'arbo : 1
            // Par exemple : adresse#1
            // Il n'y a pas de point on récupère directement
            // la valeur dans val (let val = lbl.split("."))
            case 1:
                // type d'occurence
                // unique (1) : on ajoute directment la valeur au set
                // Par exemple pour l'adresse 
                // elt["adresse"] : pour la valeur de l'adresse
                // dans notre cas "adresse" est dans val[0]
                // On utilise donc elt[ val[0] ]
                if (occurence == 1) { set.add(element[val[0]]) }
                // multiple (multi) : on parcours toutes les valeurs mises dans le tableau
                if (occurence == 'multi') {
                    element.forEach((elt) => {
                        tabObj.push(elt[val[0]])
                    })
                }
                break
            // niveau de l'arbo : 2
            // Par exemple : laSpecialite.nom
            // On obtient la valeur en faisant let val = lbl.split(".")
            // val[0] : "laSpecialite"
            // val[1] : "nom"
            case 2:
                // type d'occurence
                // unique (1) : on ajoute directment la valeur au set
                // Par exemple pour laSpecialite.nom 
                // elt["laSpecialite"]["nom"] : pour la valeur de la specialite
                // dans notre cas "laSpecialite" est dans val[0] et nom dans val[1]
                // On utilise donc elt[ val[0] ][ val[1] ]
                if (occurence == 1) { set.add(element[val[0]][val[1]]) }
                // multiple (multi) : on parcours toutes les valeurs mises dans le tableau
                if (occurence == 'multi') {
                    element[val[0]].forEach((elt) => {
                        tabObj.push(elt[val[1]])
                    })
                }
                break
            case 3:
                if (occurence == 1) { set.add(element[val[0]][val[1]][val[2]]) }
                if (occurence == 'multi') {
                    element[val[0][val[1]]].forEach((elt) => {
                        tabObj.push(elt[val[2]])
                    })
                }
                break
            case 4:
                if (occurence == 1) { set.add(element[val[0]][val[1]][val[2]][val[3]]) }
                if (occurence == 'multi') {
                    element[val[0][val[1]][val[2]]].forEach((elt) => {
                        tabObj.push(elt[val[3]])
                    })
                }
                break
            // etc
        }   // fin du switch
    })  // fin boucle lstData
    // Si multi on passe par le set pour éliminer les doublons
    if (occurence == 'multi') {
        set = new Set(tabObj)
    }
    // Transfert du set dans le tableau de retour des résultats
    retour = Array.from(set)
    // Tri pour avoir un ordre croissant dans les labels
    retour.sort()
    // Transmission des labels
    return retour

}



// Fonction exportable
// 1° paramètre : les données
// 2° paramètre : les labels
// 3° paramètre : le libelle du label sur laquel l'opération est effectuée # occurence dans les données
export const countDatas = (lst, lstLabel, libLabel) => {
    // occurence et valeur du label
    let tl = libLabel.split('#')
    let lbl = tl[0]
    let occurence = tl[1]
    // valeur du label
    let val = lbl.split(".")
    // tableau de comptage à retourner
    let retour = []
    // Boucle sur les labels
    lstLabel.forEach((label) => {
        // variable pour le comptage pour un label
        let nb = 0
        // Boucle sur les données
        lst.forEach((element) => {
            switch (val.length) {
                case 1:
                    // type d'occurence
                    if (occurence == 1) {
                        if (element[val[0]] == label) { nb++ }
                    }
                    if (occurence == 'multi') {
                        element[val[0]].forEach((elt) => { nb++ })
                    }
                    break
                case 2:
                    // type d'occurence
                    if (occurence == 1) {
                        if (element[val[0]][val[1]] == label) { nb++ }
                    }
                    if (occurence == 'multi') {
                        element[val[0]].forEach((elt) => {
                            if (elt[val[1]] == label) { nb++ }
                        })

                    }
                    break
                case 2:
                    // type d'occurence
                    if (occurence == 1) {
                        if (element[val[0]][val[1]][val[2]] == label) { nb++ }
                    }
                    if (occurence == 'multi') {
                        element[val[0][val[1]]].forEach((elt) => {
                            if (elt[val[2]] == label) { nb++ }
                        })

                    }
                    break
                // etc
            } // Fin switch
        }) // Fin boucle données
        retour.push(nb)
    })  // Fin boucle labels
    return retour
}