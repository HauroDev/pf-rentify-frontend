import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchGetAllProductsAsync,
	fetchGetAllProductsToFillAsync,
	resetProducState,
	setOffset,
} from '../app/features/products/productsSlice'
import Cards from '../components/Home/Cards'
import Loader from '../components/Loader'
import OrderSelect from '../components/Selects/OrderSelect'
import BtnMore from '../components/BtnMore'

const Home = () => {
	const dispatch = useDispatch()
	const productsState = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(fetchGetAllProductsAsync(productsState.endpoint))
		console.log(productsState.endpoint)
	}, [productsState.endpoint, dispatch])

	useEffect(() => {
		return () => {
			dispatch(resetProducState())
		}
	}, [])

	const handleNext = () => {
		dispatch(fetchGetAllProductsToFillAsync(productsState.next))
		dispatch(setOffset())
	}
	return (
		<div className='pb-12'>
			<div className='flex justify-end'>
				<section className='w-52 mb-8 absolute'>
					<OrderSelect />
				</section>
			</div>
			<div className='mt-20 mb-8'>
				{productsState.products.length ? <Cards /> : ''}
				{!productsState.products.length && productsState.status === 'success' ? (
					<h3 className='text-center text-2xl'>No results</h3>
				) : (
					''
				)}
				{productsState.status === 'loading' && <Loader />}
				{productsState.status === 'error' && <h3>Error: {productsState.error}</h3>}
			</div>

			<div>
				{productsState.next && productsState.status !== 'loading' ? (
					<BtnMore label='More products' onclick={handleNext} />
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default Home
