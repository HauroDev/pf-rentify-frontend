export const splitLocationName = (name = '') => {
	const nameStart = [
		{ name: 'Departamento de' },
		{ name: 'Departamento del' },
		{ name: 'Departamento de la' },
		{ name: 'Estado de' },
		{ name: 'Estado del' },
		{ name: 'Estado de la' },
		{ name: 'Provincia de' },
		{ name: 'Provincia del' },
		{ name: 'Provincia de la' },
	]
	let toReturn = ''

	nameStart.forEach((option) => {
		if (name.startsWith(option.name)) {
			toReturn = name.split(option.name)[1].trim()
			return
		}
	})

	return toReturn || name
}
