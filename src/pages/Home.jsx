import { useEffect } from 'react'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetAllProductsAsync } from '../app/features/products/productsSlice'

const Home = () => {
	const dispatch = useDispatch()
	const productsState = useSelector((state) => state.products)

	useEffect(() => {
		dispatch(fetchGetAllProductsAsync())
	}, [dispatch])

	console.log(productsState)

	return (
		<div>
			<Card />
		</div>
	)
}

export default Home
