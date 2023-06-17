import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGetAllCategoriesAsync } from '../../app/features/categories/categoriesSlice'
import {
	resetOffset,
	setEndpoint,
	setCategory,
	resetCategory,
} from '../../app/features/products/productsSlice'
import {
	retunrOffsetAndLimit,
	returnCategoriesQuery,
	returnOrderQuery,
} from '../../utils/filterAndPag'
import CustomSelect from './CustomSelect'
import Loader from '../Loader'

const SelectCategoryFilter = () => {
	const [isOpen, openModal, closeModal] = useModal()
	const [labelCategory, setLabelCategory] = useState('')
	const dispatch = useDispatch()
	const categoriesState = useSelector((state) => state.categories)
	const productState = useSelector((state) => state.products)

	useEffect(() => {
		if (categoriesState.categories.length <= 0) {
			dispatch(fetchGetAllCategoriesAsync())
		}
	}, [])

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		dispatch(resetOffset())
		setLabelCategory('')
		const endpointSplited = productState.endpoint.split('?')[0]
		const offsetLimit = retunrOffsetAndLimit(0, productState.limit)
		const categQuery = ''
		const orderQuery = productState.order.orderBy
			? returnOrderQuery(productState.order.orderBy, productState.order.orderType)
			: ''
		dispatch(setEndpoint(`${endpointSplited}?${orderQuery}&${offsetLimit}&${categQuery}`))
		dispatch(resetCategory())
		closeModal()
	}

	const handleSelect = (id, name) => {
		console.log(name)
		setLabelCategory(name)
		dispatch(resetCategory())
		dispatch(resetOffset())
		dispatch(setCategory(id))
		const offsetLimit = retunrOffsetAndLimit(0, productState.limit)
		const endpointSplited = productState.endpoint.split('?')[0]
		const categQuery = returnCategoriesQuery(id)
		const orderQuery = productState.order.orderBy
			? returnOrderQuery(productState.order.orderBy, productState.order.orderType)
			: ''
		dispatch(setEndpoint(`${endpointSplited}?${orderQuery}&${offsetLimit}&${categQuery}`))
		closeModal()
	}

	return (
		<>
			<CustomSelect
				handleOpenClose={handleOpenModal}
				isOpen={isOpen}
				label='Categories'
				positionLabel='left'
				messageSelect={labelCategory || 'Select Category'}>
				<article
					className='hover:bg-dark_purple hover:text-white px-3 py-1 selection:bg-transparent'
					onClick={handleRestart}>
					Default
				</article>
				{categoriesState.status === 'success' ? (
					categoriesState.categories.map((category) => (
						<article
							key={category.idCategory}
							className='hover:bg-dark_purple hover:text-white px-3 py-1 selection:bg-transparent capitalize'
							onClick={() => handleSelect(category.idCategory, category.name)}>
							{category.name}
						</article>
					))
				) : categoriesState.status === 'loading' ? (
					<Loader />
				) : (
					''
				)}
			</CustomSelect>
		</>
	)
}

export default SelectCategoryFilter
