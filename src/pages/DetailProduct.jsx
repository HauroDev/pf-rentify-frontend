import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
	fetchGetProductByIdAsync,
	resetDetail,
	resetError,
} from '../app/features/products/productsSlice'

import DetailsTop from '../components/Details/DetailsTop'
import DetailsMid from '../components/Details/DetailsMid'
import DetailComments from '../components/Details/DetailComments'

const DetailProduct = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(fetchGetProductByIdAsync(id))

		return () => {
			dispatch(resetDetail())
			dispatch(resetError())
		}
	}, [dispatch, id])

	if (productState.status === 'loading') return <h3>Loading...</h3>

	if (productState.error) return <h3>Error: {productState.error}</h3>

	const { productDetail } = productState

	return (
		<div className='w-full xl:w-10/12  mx-auto flex flex-col gap-8'>
			{productState.status === 'success' && (
				<>
					<DetailsTop
						idProd={productDetail.idProd}
						image={productDetail.image}
						location={productDetail.location}
						name={productDetail.name}
						price={productDetail.price}
						updatedAt={productDetail.updatedAt}
					/>

					<DetailsMid description={productDetail.description} />

					{productDetail.users.length > 0 ? <DetailComments 
						user={productDetail.users[0]} 
					
					/> : ''}
				</>
			)}
		</div>
	)
}

export default DetailProduct
