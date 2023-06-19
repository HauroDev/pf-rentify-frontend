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
import { filterQuery } from '../../utils/filterAndPag'
import CustomSelect from './CustomSelect'
import Loader from '../Loader'
import SelectCustomOption from './SelectCustomOption'

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

		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: '',
			idCountry: productState.idCountry,
			location: productState.location,
			state: productState.stateLoc,
		})
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(resetCategory())
		closeModal()
	}

	const handleSelect = (id, name) => {
		setLabelCategory(name)
		dispatch(resetOffset())
		dispatch(setCategory(id))
		const endpointSplited = productState.endpoint.split('?')[0]

		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: id,
			idCountry: productState.idCountry,
			location: productState.location,
			state: productState.stateLoc,
		})
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
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
				<SelectCustomOption label='Default' onclick={handleRestart} />

				{categoriesState.status === 'success' ? (
					categoriesState.categories.map((category) => (
						<SelectCustomOption
							key={category.idCategory}
							label={category.name}
							onclick={() => handleSelect(category.idCategory, category.name)}
						/>
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
