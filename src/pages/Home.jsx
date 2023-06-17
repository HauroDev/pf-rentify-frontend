import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchGetAllProductsAsync,
	resetEndpoint,
	resetError,
} from '../app/features/products/productsSlice'
import Cards from '../components/Home/Cards'
import Loader from '../components/Loader'

const Home = () => {
	const dispatch = useDispatch()
	const productsState = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(fetchGetAllProductsAsync(productsState.endpoint))

		return () => {
			dispatch(resetError())
		}
	}, [productsState.endpoint])

	useEffect(() => {
		return () => {
			dispatch(resetEndpoint())
		}
	}, [])

	return (
		<div>
			{productsState.products.length && productsState.status !== 'loading' ? <Cards /> : ''}
			{productsState.status === 'loading' && <Loader />}
			{productsState.status === 'error' && <h3>Error: {productsState.error}</h3>}
		</div>
	)
}

export default Home
