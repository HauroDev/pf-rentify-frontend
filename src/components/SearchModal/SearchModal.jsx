import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetSearch } from '../../app/features/search/searchSlice'
import { useNavigate, useLocation } from 'react-router-dom'

import ModalContainer from '../ModalContainer'
import FormSearch from './FormSearch'
import CardSearch from '../CardSearch'
import { routesName } from '../../utils/routes_name'
import BtnMore from '../BtnMore'

/* eslint-disable react/prop-types */
const SearchModal = ({ closeModal }) => {
	const searchState = useSelector((state) => state.search)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		document.addEventListener('keyup', (event) => {
			if (event.code === 'Escape') {
				closeModal()
			}
		})

		return () => {
			if (!location.pathname.includes('/search')) {
				dispatch(resetSearch())
			}
		}
	}, [closeModal, dispatch])

	const handleMoreBtn = () => {
		navigate(`${routesName.search_products}/?name=${searchState.search}`)
		closeModal()
	}

	return (
		<ModalContainer>
			<div className='blur-in-expand overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-dark_purple scrollbar-track-light_purple scrollbar-track-rounded-lg relative mx-auto min-h-[300px] max-h-[350px] w-full md:w-8/12 max-w-[650px] rounded-md bg-body_light dark:bg-body_dark shadow-xl'>
				<div className='pb-4'>
					<section className='flex items-center gap-2 px-4 py-2 border-b-[1px] h-16 border-b-gray_dark'>
						<FormSearch />
						<button
							className=' bg-medium_fuchsia text-white px-2 py-1 rounded transition-colors hover:shadow-lg hover:bg-dark_purple'
							onClick={closeModal}>
							ESC
						</button>
					</section>

					<section className=' w-full h-[calc(100%-64px)] p-4'>
						{searchState.status === 'loading' && <h3>Loading...</h3>}
						{searchState.status === 'error' && <h3>Error: {searchState.error}</h3>}
						{searchState.products.length ? (
							<>
								<p className='font-bold mb-3'> Results for &quot;{searchState.search}&quot;:</p>
								<section className='grid gap-4 mb-4 '>
									{searchState.products.map((product) => (
										<CardSearch
											key={product.idProd}
											image={product.image}
											name={product.name}
											id={product.idProd}
											price={product.price}
											updatedAt={product.updatedAt}
											country={product.country}
											closeModal={closeModal}
										/>
									))}
								</section>
								{searchState.next && <BtnMore label='More' onclick={handleMoreBtn} />}
							</>
						) : (
							''
						)}
					</section>
				</div>
			</div>
		</ModalContainer>
	)
}

export default SearchModal
