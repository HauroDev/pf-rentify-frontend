import { useEffect, useState } from 'react'

const LocationExample = () => {
	const [latitude, setLatitude] = useState(null)
	const [longitude, setLongitude] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function (position) {
					setLatitude(position.coords.latitude)
					setLongitude(position.coords.longitude)
				},
				function (error) {
					setError(error.message)
				}
			)
		} else {
			setError('La geolocalización no es compatible en este navegador.')
		}
	}, [])

	return (
		<div>
			<h3>Coordenadas del usuario:</h3>
			{latitude && longitude ? (
				<p>
					Latitud: {latitude}, Longitud: {longitude}
				</p>
			) : error ? (
				<p>{error}</p>
			) : (
				<p>Cargando...</p>
			)}
		</div>
	)
}

export default LocationExample
