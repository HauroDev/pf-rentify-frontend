/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { getCountryStates } from '../../services/locationService'
import { splitLocationName } from '../../utils/splitLocationName'
import { useSelector, useDispatch } from 'react-redux'
import {
	setStateLoc,
	resetStateLoc,
	resetLocation,
	setEndpoint,
	resetOffset,
} from '../../app/features/products/productsSlice'
import { filterQuery } from '../../utils/filterAndPag'
import SelectLocation from './SelectLocation'
import CustomSelect from './CustomSelect'
import SelectCustomOption from './SelectCustomOption'

const SelectState = ({ dataStates = [] }) => {
	const [isOpen, openModal, closeModal] = useModal()
	const [stateName, setStateName] = useState('')
	const [stateApi, setStateapi] = useState(null)
	const [dataCities, setDataCities] = useState([])
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	useEffect(() => {
		const getData = async (id) => {
			try {
				const data = await getCountryStates(id)
				setDataCities(data)
			} catch (error) {
				// console.log(error)
			}
		}

		if (stateApi) {
			setDataCities([])
			getData(stateApi)
		}
	}, [stateApi])

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		setStateapi(null)
		setStateName('')
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			state: '',
			location: '',
		})

		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(resetOffset())
		dispatch(resetStateLoc())
		dispatch(resetLocation())
		closeModal()
	}

	const handleSelect = (idApi, name) => {
		const nameSplitet = splitLocationName(name)
		setStateapi(idApi)
		setStateName(nameSplitet)
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: productState.idCountry,
			state: nameSplitet,
			location: '',
		})

		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(resetOffset())
		dispatch(setStateLoc(nameSplitet))
		dispatch(resetLocation())
		closeModal()
	}

	return (
		<>
			<CustomSelect
				handleOpenClose={handleOpenModal}
				isOpen={isOpen}
				label='State'
				positionLabel='left'
				messageSelect={stateName || 'Select state'}>
				<SelectCustomOption label='All states' onclick={handleRestart} />

				{dataStates.map((state) => (
					<SelectCustomOption
						key={state.geonameId}
						label={splitLocationName(state.adminName1)}
						onclick={() => handleSelect(state.geonameId, state.adminName1)}
					/>
				))}
			</CustomSelect>

			{stateApi && dataCities.length ? <SelectLocation dataCities={dataCities} /> : ''}
		</>
	)
}

export default SelectState
