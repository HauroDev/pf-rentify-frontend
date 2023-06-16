/**Recibe la url de la imagen y la funcion que setea el estado para validarla
 * img:URL
 * set:()=>{}
 */

export const isImgValid = (img, set) => {
	const imagen = new Image()
	imagen.onload = () => {
		set(true)
	}
	imagen.onerror = () => {
		set(false)
	}

	imagen.src = img
}
