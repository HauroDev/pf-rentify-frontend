import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from '../../utils/debounce'
import {
	fetchGetProductByNameAsync,
	resetSearch,
	setSearch,
} from '../../app/features/search/searchSlice'
import InputSearch from './InputSearch'

const FormSearch = () => {
	const [searchInput, setSearchInput] = useState('')
	const dispatch = useDispatch()

	const debounceFunc = debounce((value) => {
		if (value.trim()) {
			dispatch(fetchGetProductByNameAsync(value))
			dispatch(setSearch(value))
		} else {
			dispatch(resetSearch())
		}
	}, 500)

	const handleChange = (event) => {
		setSearchInput(event.target.value)
		debounceFunc(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		debounceFunc(searchInput)
	}

	return (
		<form action='' onSubmit={handleSubmit} className='w-full bg-transparent'>
			<InputSearch
				name='searchInput'
				placeholder='Ex: Play'
				value={searchInput}
				onchange={handleChange}
			/>
		</form>
	)
}

export default FormSearch
