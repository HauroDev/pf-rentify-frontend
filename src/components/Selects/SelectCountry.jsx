import { useEffect, useState } from 'react'
import { useModal } from '../../hooks/useModal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGetAllCountriessAsync } from '../../app/features/countries/countriesSlice'
import { getCountryStates } from '../../services/locationService'
import {
	setCountry,
	resetCountry,
	resetStateLoc,
	resetLocation,
	setEndpoint,
	resetOffset,
} from '../../app/features/products/productsSlice'
import { filterQuery } from '../../utils/filterAndPag'
import SelectCustomOption from './SelectCustomOption'
import CustomSelect from './CustomSelect'
import SelectState from './SelectState'

const SelectCountry = () => {
	const [isOpen, openModal, closeModal] = useModal()
	const [countryName, setCountryName] = useState('')
	const [countryApi, setCountryapi] = useState(null)
	const [dataStates, setDataStates] = useState([])
	const dispatch = useDispatch()
	const countriesState = useSelector((state) => state.countries)
	const productState = useSelector((state) => state.products)

	const getData = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataStates(data)
		} catch (error) {
			// console.log(error)
		}
	}

	useEffect(() => {
		if (!countriesState.countries.length) {
			dispatch(fetchGetAllCountriessAsync())
		}
		if (countryApi) {
			setDataStates([])
			getData(countryApi)
		}
	}, [countryApi])

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		dispatch(resetCountry())
		dispatch(resetOffset())
		setCountryapi(null)
		setCountryName('')
		setDataStates([])
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: '',
			location: '',
			state: '',
		})
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(resetOffset())
		dispatch(resetCountry())
		dispatch(resetStateLoc())
		dispatch(resetLocation())
		closeModal()
	}

	const handleSelect = (id, idApi, name) => {
		setCountryapi(idApi)
		setCountryName(name)
		const endpointSplited = productState.endpoint.split('?')[0]
		const query = filterQuery({
			offset: 0,
			limit: productState.limit,
			orderBy: productState.order.orderBy,
			orderType: productState.order.orderType,
			idCategory: productState.idCategory,
			idCountry: id,
			location: '',
			state: '',
		})
		dispatch(setEndpoint(`${endpointSplited}?${query}`))
		dispatch(setCountry(id))
		dispatch(resetStateLoc())
		dispatch(resetLocation())
		closeModal()
	}

	return (
		<>
			<CustomSelect
				handleOpenClose={handleOpenModal}
				isOpen={isOpen}
				label='Country'
				positionLabel='left'
				messageSelect={countryName || 'Select Country'}>
				<SelectCustomOption label='All countries' onclick={handleRestart} />

				{countriesState.countries.map((country) => (
					<SelectCustomOption
						key={country.idCountry}
						label={country.name}
						onclick={() => handleSelect(country.idCountry, country.geonameId, country.name)}
					/>
				))}
			</CustomSelect>
			{dataStates.length ? <SelectState dataStates={dataStates} /> : ''}
		</>
	)
}

export default SelectCountry
