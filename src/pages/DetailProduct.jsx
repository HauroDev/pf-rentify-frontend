import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	fetchGetProductByIdAsync,
	resetDetail,
	resetError,
} from '../app/features/products/productsSlice'
import imgNotFound from '../assets/image/image-not-found.jpg'

const DetailProduct = () => {
	const [imgExist, setImgExist] = useState(false)
	const { id } = useParams()
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(fetchGetProductByIdAsync(id))

		return () => {
			dispatch(resetDetail())
			dispatch(resetError())
		}
	}, [])

	if (productState.status === 'loading') return <h3>Loading...</h3>

	if (productState.error) return <h3>Error: {productState.error}</h3>

	const { productDetail } = productState

	const imagen = new Image()
	imagen.onload = () => {
		setImgExist(true)
	}
	imagen.onerror = () => {
		setImgExist(false)
	}

	imagen.src = productDetail.image

	return (
		<div>
			<section>
				<div>
					<img src={imgExist ? productDetail.image : imgNotFound} alt={productDetail.name} />
				</div>
				<div></div>
			</section>
		</div>
	)
}

export default DetailProduct
