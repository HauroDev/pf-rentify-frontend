/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { splitLocationName } from '../../utils/splitLocationName'
import { useSelector, useDispatch } from 'react-redux'
import { resetLocation, setEndpoint, setLocation } from '../../app/features/products/productsSlice'
import { filterQuery } from '../../utils/filterAndPag'
import CustomSelect from './CustomSelect'
import SelectCustomOption from './SelectCustomOption'

const SelectLocation = ({ dataCities = [] }) => {
	const [isOpen, openModal, closeModal] = useModal()
	const [cityName, setCityName] = useState('')
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			state: productState.stateLoc,
			location: '',
		})
		setCityName('')
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(resetLocation())
		closeModal()
	}

	const handleSelect = (name) => {
		const nameSplitet = splitLocationName(name)
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			state: productState.stateLoc,
			location: nameSplitet,
		})
		setCityName(nameSplitet)
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(setLocation(nameSplitet))
		closeModal()
	}

	return (
		<>
			<CustomSelect
				handleOpenClose={handleOpenModal}
				isOpen={isOpen}
				label='Location'
				positionLabel='left'
				messageSelect={cityName || 'Select Location'}>
				<SelectCustomOption label='All locations' onclick={handleRestart} />

				{dataCities.map((city) => (
					<SelectCustomOption
						key={city.geonameId}
						label={splitLocationName(city.name)}
						onclick={() => handleSelect(city.name)}
					/>
				))}
			</CustomSelect>
		</>
	)
}

export default SelectLocation
