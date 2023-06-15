import { useEffect } from 'react'
import ModalContainer from '../ModalContainer'
import FormSearch from './FormSearch'
import CardSearch from './CardSearch'

/* eslint-disable react/prop-types */
const SearchModal = ({ closeModal }) => {
	useEffect(() => {
		document.addEventListener('keyup', (event) => {
			if (event.code === 'Escape') {
				closeModal()
			}
		})
	}, [closeModal])

	return (
		<ModalContainer>
			<div className='blur-in-expand overflow-hidden relative mx-auto h-[450px] md:h-[650px] w-full md:w-8/12 max-w-[650px] rounded-md  bg-body_light dark:bg-body_dark shadow-xl '>
				<div className='flex items-center gap-2 px-4 py-2 border-b-[1px] h-16 border-b-gray_dark'>
					<FormSearch />
					<button
						className=' bg-medium_fuchsia text-white px-2 py-1 rounded transition-colors hover:shadow-lg hover:bg-dark_purple'
						onClick={closeModal}>
						ESC
					</button>
				</div>

				<div className=' w-full h-[calc(100%-64px)] p-4'>
					<p className='font-bold mb-3'>Search Results:</p>
					<CardSearch />
				</div>
			</div>
		</ModalContainer>
	)
}

export default SearchModal
