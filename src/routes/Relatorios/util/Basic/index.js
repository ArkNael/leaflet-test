export const transformData = (data, dataArrayName) => {
    const array = Object.keys(data[0][dataArrayName])
    return array.map((element, index) => ({
        key: index + 1,
        nome: element.toLowerCase(),
        dados: data.reduce((obj, item) => ({
            ...obj,
            [item.mes.substr(0, 3)]: obj[item.mes.substr(0, 3)] ? obj[item.mes.substr(0, 3)] + item[dataArrayName][element] : item[dataArrayName][element], 
            Total: obj.Total + item[dataArrayName][element],
        }), 
        { jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0, Total: 0 }),
    }))
}

export const getYears = () => {
	let years = []
	for (let i = 2023; i <= new Date().getFullYear(); i++) {
		years.push(i)
	}
	return years
}

export const rowClassName = record => {
	if (record.isFooter) {
	  return 'last-table-row'
	}
	return ''
}