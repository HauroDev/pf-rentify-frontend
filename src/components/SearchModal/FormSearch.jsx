import { useState } from 'react'
import InputSearch from './InputSearch'

const FormSearch = () => {
	const [search, setSearch] = useState('')

	const handleChange = (event) => {
		setSearch(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		console.log(search)
	}

	return (
		<form action='' onSubmit={handleSubmit} className='w-full bg-transparent'>
			<InputSearch name='search' placeholder='Ex: Play' value={search} onchange={handleChange} />
		</form>
	)
}

export default FormSearch
