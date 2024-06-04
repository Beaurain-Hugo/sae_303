export const linearData = (fields, items) => {
    fields.forEach((field) => {
        let t = field.key.split('.')
        let lg = t.length
        items.forEach((item) => {
            if (lg == 1) {
                if (Array.isArray(item[field.key])) {
                    let value = ''
                    item[field.key].forEach((val) => { value += " " + val })
                    item[field.key] = value
                } else {

                }
            }
            if (lg == 2) {
                if (Array.isArray(item[t[0]])) {
                    let value = ''
                    item[t[0]].forEach((val) => { value += " " + val[t[1]] })
                    item[field.key] = value
                } else {
                    item[field.key] = item[t[0]][t[1]]

                }
            }
            if (lg == 3) {
                [t[1]]
                if (Array.isArray(item[t[0]][t[1]])) {
                    let value = ''
                    item[t[0]][t[1]].forEach((val) => { value += " " + val[t[2]] })
                    item[field.key] = value
                } else {
                    item[field.key] = item[t[0]][t[1]][t[2]]

                }
            }

            // etc
        })
    })
    return items
}

export const sortCol = (items, field) => {
    const compareString = (a, b) => {
        return a[field.key].toLowerCase() > b[field.key].toLowerCase() ? 1 * field.sort : -1 * field.sort
    }
    const compareNumber = (a, b) => {
        return parseFloat(a[field.key]) > parseFloat(b[field.key]) ? 1 * field.sort : -1 * field.sort
    }

    if (field.type == 'number') { items = items.sort(compareNumber) }
    else { items == items.sort(compareString) }

    field.sort = field.sort * -1
}

//export const filterColumn = (field, itemsSvg) => {
//    const filterString = () => {
//        return itemsSvg.filter((element) => {
//            return element[field.key].toLowerCase().includes(field.filter.toLowerCase())
//        })
//    }
//    const filterNumber = () => {
//        return itemsSvg.filter((element) => {
//            return element[field.key].parseFloat().includes(field.filter.parseFloat())
//        })
//    }
//    if (field.type == 'number') { itemsSvg = itemsSvg.filter(filterNumber) }
//    else { itemsSvg == itemsSvg.filter(filterString) }
//}

export const filterColumn = (field, itemsSvg) => {
    return itemsSvg.filter((element) => {
        element[field.key] = element[field.key].toString()
        if (element[field.key] === undefined) {
            return false
        } else {
            return element[field.key].toLowerCase().includes(field.filter.toLowerCase())
        }
    })
}
