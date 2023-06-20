import { useModal } from '../../hooks/useModal'
import { useSelector, useDispatch } from 'react-redux'
import { resetOrder, setEndpoint } from '../../app/features/products/productsSlice'
import { setOrder, resetOffset } from '../../app/features/products/productsSlice'
import { filterQuery } from '../../utils/filterAndPag'
import { orderByOptions } from '../../utils/order'
import CustomSelect from './CustomSelect'
import SelectCustomOption from './SelectCustomOption'
import { useState } from 'react'

const OrderSelect = () => {
	const [isOpen, openModal, closeModal] = useModal()
	const [orderLabel, setOrderLabel] = useState(null)
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		dispatch(resetOffset())
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: '',
			orderType: '',
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			location: productState.location,
			state: productState.stateLoc,
		})
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		setOrderLabel(null)
		dispatch(resetOrder())
		closeModal()
	}

	const handleSelect = (by, type, label) => {
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: by,
			orderType: type,
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			location: productState.location,
			state: productState.stateLoc,
		})
		setOrderLabel(label)
		dispatch(resetOffset())
		dispatch(setOrder({ orderBy: by, orderType: type }))
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		closeModal()
	}

	return (
		<CustomSelect
			label='Order'
			messageSelect={orderLabel || 'Sort by'}
			isOpen={isOpen}
			handleOpenClose={handleOpenModal}>
			<SelectCustomOption label='Default' onclick={handleRestart} />

			{orderByOptions.map((opt) => (
				<SelectCustomOption
					key={opt.id}
					label={opt.label}
					onclick={() => handleSelect(opt.by, opt.type, opt.label)}
				/>
			))}
		</CustomSelect>
	)
}

export default OrderSelect
