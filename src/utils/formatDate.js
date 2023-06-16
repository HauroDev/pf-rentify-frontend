export const formatDate = (date) => {
	const opciones = { year: 'numeric', month: 'short', day: 'numeric' }
	const newDate = new Date(date)

	return newDate.toLocaleDateString('en', opciones)
}
