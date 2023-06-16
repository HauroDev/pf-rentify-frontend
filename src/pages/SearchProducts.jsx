import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { fetchGetProductByNameAsync, setSearch } from '../app/features/search/searchSlice'

const SearchProducys = () => {
	const dispatch = useDispatch()
	const searchState = useSelector((state) => state.search)
	const location = useLocation()
	const locSearch = location.search.split('=')[1]

	useEffect(() => {
		if (!searchState.products.length) {
			dispatch(fetchGetProductByNameAsync(locSearch))
			dispatch(setSearch(locSearch))
		}
	}, [dispatch])

	console.log(searchState)

	return (
		<div>
			<h2 className='font-bold text-lg md:text-xl mb-3'>
				Results for &quot;{searchState.search}&quot;:
			</h2>
			{searchState.products.map((product) => (
				<div key={product.idProd}>
					<h3>{product.name}</h3>
				</div>
			))}
		</div>
	)
}

export default SearchProducys
