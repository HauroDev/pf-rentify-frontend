/* eslint-disable react/prop-types */
import SearchIcon from '../icons/SearchIcon'
import SearchModal from '../SearchModal/SearchModal'
import { useModal } from '../../hooks/useModal'

const SearchBtn = ({ closeSide }) => {
	const [isOpen, openModal, closeModal] = useModal()

	const handleClick = () => {
		closeSide()
		openModal()
	}

	return (
		<>
			<div
				className='flex justify-between items-center bg-white border-[1px] border-gray_dark py-1 px-4 rounded-md hover:cursor-pointer dark:bg-card_dark'
				onClick={handleClick}>
				<span className='text-gray_dark selection:bg-transparent'>Search</span>
				<SearchIcon className='stroke-gray_dark w-6 h-6' />
			</div>

			{isOpen && <SearchModal closeModal={closeModal} />}
		</>
	)
}

export default SearchBtn
