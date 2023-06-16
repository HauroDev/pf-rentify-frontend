import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetStatus } from '../../app/features/search/searchSlice'
import { useNavigate } from 'react-router-dom'

import ModalContainer from '../ModalContainer'
import FormSearch from './FormSearch'
import CardSearch from './CardSearch'
import { routesName } from '../../utils/routes_name'

/* eslint-disable react/prop-types */
const SearchModal = ({ closeModal }) => {
	const searchState = useSelector((state) => state.search)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		document.addEventListener('keyup', (event) => {
			if (event.code === 'Escape') {
				closeModal()
			}
		})

		return () => {
			dispatch(resetStatus())
		}
	}, [closeModal, dispatch])

	const handleMoreBtn = () => {
		navigate(`${routesName.search_products}/?name=${searchState.search}`)
		closeModal()
	}

	return (
		<ModalContainer>
			<div className='blur-in-expand overflow-auto relative mx-auto h-[450px] md:h-[650px] w-full md:w-8/12 max-w-[650px] rounded-md  bg-body_light dark:bg-body_dark shadow-xl '>
				<div className='flex items-center gap-2 px-4 py-2 border-b-[1px] h-16 border-b-gray_dark'>
					<FormSearch />
					<button
						className=' bg-medium_fuchsia text-white px-2 py-1 rounded transition-colors hover:shadow-lg hover:bg-dark_purple'
						onClick={closeModal}>
						ESC
					</button>
				</div>

				<div className=' w-full h-[calc(100%-64px)] p-4'>
					{searchState.status === 'loading' && <h3>Loading...</h3>}
					{searchState.status === 'error' && <h3>Error: {searchState.error}</h3>}
					{searchState.products.length ? (
						<>
							<p className='font-bold mb-3'> Results for &quot;{searchState.search}&quot;:</p>
							<section className='grid gap-4 mb-8'>
								{searchState.products.map((product) => (
									<CardSearch
										key={product.idProd}
										image={product.image}
										name={product.name}
										id={product.idProd}
										price={product.price}
										updatedAt={product.updatedAt}
										closeModal={closeModal}
									/>
								))}
							</section>
							{searchState.next && <button onClick={handleMoreBtn}>More</button>}
						</>
					) : (
						''
					)}
				</div>
			</div>
		</ModalContainer>
	)
}

export default SearchModal
