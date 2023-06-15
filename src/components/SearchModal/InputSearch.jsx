import SearchIcon from '../icons/SearchIcon'

/* eslint-disable react/prop-types */
const InputSearch = ({ name, value, onchange, placeholder = '' }) => {
	return (
		<div className='w-full flex gap-4 justify-center items-center'>
			<SearchIcon className='stroke-gray_dark' />
			<input
				type='text'
				name={name}
				id={name}
				value={value}
				placeholder={placeholder}
				className='w-full py-1 px-2 text-lg rounded-md  outline-none  bg-transparent'
				onChange={onchange}
			/>
		</div>
	)
}

export default InputSearch
