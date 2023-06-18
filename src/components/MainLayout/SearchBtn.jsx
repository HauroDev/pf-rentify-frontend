import SearchIcon from '../icons/SearchIcon'
import SearchModal from '../SearchModal/SearchModal'
import { useModal } from '../../hooks/useModal'

const SearchBtn = () => {
	const [isOpen, openModal, closeModal] = useModal()

	return (
		<>
			<div
				className='flex justify-between items-center bg-white border-[1px] border-gray_dark py-1 px-4 rounded-md hover:cursor-pointer dark:bg-card_dark'
				onClick={openModal}>
				<span className='text-gray_dark selection:bg-transparent'>Search</span>
				<SearchIcon className='stroke-gray_dark w-6 h-6' />
			</div>

			{isOpen && <SearchModal closeModal={closeModal} />}
		</>
	)
}

export default SearchBtn
