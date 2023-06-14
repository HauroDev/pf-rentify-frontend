import SearchIcon from '../icons/SearchIcon'

const SearchInput = () => {
	return (
		<div className='flex justify-between items-center bg-white border-[1px] border-gray_dark py-1 px-4 rounded-md hover:cursor-pointer'>
			<span className='text-gray_dark selection:bg-transparent'>Search</span>
			<SearchIcon className='stroke-gray_dark w-6 h-6' />
		</div>
	)
}

export default SearchInput
