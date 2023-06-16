import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
	fetchGetMoreProductByNameAsync,
	fetchGetProductByNameAsync,
	setSearch,
} from '../app/features/search/searchSlice'
import CardsSearch from '../components/SearchView/CardsSearch'
import Loader from '../components/Loader'
import BtnMore from '../components/BtnMore'

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

	if (searchState.error) return <h3>Error: {setSearch.error}</h3>

	const handleMore = () => {
		dispatch(fetchGetMoreProductByNameAsync(searchState.next))
	}

	return (
		<div>
			<h2 className='font-bold text-lg md:text-xl mb-3'>
				Results for &quot;{searchState.search}&quot;:
			</h2>
			{searchState.products.length ? <CardsSearch products={searchState.products} /> : ''}

			{!searchState.products.length && searchState.status !== 'loading' ? (
				<h3>There are no results</h3>
			) : (
				''
			)}

			{searchState.status !== 'loading' && !searchState.error && searchState.next ? (
				<BtnMore label='More results' onclick={handleMore} />
			) : (
				''
			)}
			{searchState.status === 'loading' && <Loader />}
		</div>
	)
}

export default SearchProducys
