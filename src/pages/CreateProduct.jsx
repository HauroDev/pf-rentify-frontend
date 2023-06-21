import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useModal } from '../hooks/useModal'
import { fetchGetAllCategoriesAsync } from '../app/features/categories/categoriesSlice'
import { getCountryStates } from '../services/locationService'
import Input from '../components/Input'
import { fetchGetAllCountriessAsync } from '../app/features/countries/countriesSlice'
import validationProducts from '../utils/validationProducts'
import SelectCustomOption from '../components/Selects/SelectCustomOption'
import CustomSelect from '../components/Selects/CustomSelect'
import { splitLocationName } from '../utils/splitLocationName'
import { fetchPostProductAsync } from '../app/features/products/productsSlice'
import { saveAndGetImage } from '../services/imageFirebaseService'

const CreateProduct = () => {
	const userId = '3ce1d6d0-506e-479a-ad4a-22535b6290de'

	//country/state
	const [isOpen, openModal, closeModal] = useModal()
	const [countryApiId, setCountryApiId] = useState(null)
	const [countryName, setCountryName] = useState('')
	const [dataStates, setDataStates] = useState([])
	//state / location
	const [stateName, setStateName] = useState('')
	const [stateApiId, setStateApiId] = useState(null)
	const [dataLocations, setDataLocations] = useState([])
	const [locationName, setLocationName] = useState('')
	const dispatch = useDispatch()
	const categoriesInfo = useSelector((state) => state.categories)
	const countriesInfo = useSelector((state) => state.countries)
	const userState = useSelector((state) => state.user)
	// función para traer info de states
	const getData = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataStates(data)
		} catch (error) {
			console.log(error)
		}
	}
	// función para traer info de locations
	const getDataLoc = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataLocations(data)
		} catch (error) {
			console.log(error)
		}
	}

	//funcion modal
	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	//
	console.log(categoriesInfo)
	console.log(countriesInfo)
	console.log(dataStates)
	console.log(dataLocations)

	//
	useEffect(() => {
		if (!categoriesInfo.categories.length) {
			dispatch(fetchGetAllCategoriesAsync())
		}
		if (!countriesInfo.countries.length) {
			dispatch(fetchGetAllCountriessAsync())
		}
		if (countryApiId) {
			setDataStates([])
			getData(countryApiId)
		}
		if (stateApiId) {
			setDataLocations([])
			getDataLoc(stateApiId)
		}
	}, [countryApiId, stateApiId])

	//category input:
	const [categoriesChecked, setCategoriesChecked] = useState({
		'electronics': false,
		'books and entertainment': false,
		'sports and fitness / health and wellness': false,
		'fashion and accessories': false,
		'home and decoration': false,
		'cars and motorcycles': false,
		'toys and kids': false,
		'personal care': false,
		'arts and crafts': false,
	})

	// Estados para las propiedades de input
	const [inputName, setInputName] = useState('')
	const [inputDescription, setInputDescription] = useState('')
	const [inputImage, setInputImage] = useState('')
	const [inputPrice, setInputPrice] = useState(0)
	const [inputCountry, setInputCountry] = useState(null)
	const [inputLocation, setInputLocation] = useState('')
	const [inputState, setInputState] = useState('')
	const [inputIsFeatured, setInputIsFeatured] = useState(false)

	// Estados para los mensajes de error de cada propiedad
	const [inputNameError, setInputNameError] = useState('')
	const [inputDescriptionError, setInputDescriptionError] = useState('')
	const [inputImageError, setInputImageError] = useState('')
	const [inputPriceError, setInputPriceError] = useState('')
	const [inputLocationError, setInputLocationError] = useState('')
	const [inputStateError, setInputStateError] = useState('')
	//const [inputIsFeaturedError, setInputIsFeaturedError] = useState(false);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		switch (name) {
			case 'name':
				setInputName(value)
				setInputNameError(validationProducts(name, value))
				break

			case 'description':
				setInputDescription(value)
				break

			case 'image':
				setInputImage(value)
				break

			case 'price':
				setInputPrice(parseFloat(value))
				break

			case 'location':
				setInputLocation(value)
				break

			case 'state':
				setInputState(value)
				break

			case 'isFeatured':
				setInputIsFeatured(checked)
				break

			case 'category':
				setCategoriesChecked((prevInput) => ({
					...prevInput,
					[value]: checked,
				}))
				break

			default:
				break
		}
	}

	const handleInputFile = (event) => {
		console.log(event.target.files[0])
		setInputImage(event.target.files[0])
	}
	//manejo del input countries
	const handleSelect = (id, idApi, name) => {
		setCountryApiId(idApi)
		setCountryName(name)
		setInputCountry(id)
		closeModal()
	}
	// const handleReset = () =>{
	// 	setCountryApiId(null);
	// 	setCountryName("");
	// 	setInputCountry(null);
	// 	setDataStates([])
	// 	closeModal()
	// }
	//manejo input state
	const handleStateSelect = (idApi, name) => {
		const splitetName = splitLocationName(name)
		setStateApiId(idApi)
		setStateName(splitetName)
		setInputState(name)
		closeModal()
	}

	const handleLocationSelect = (name) => {
		const splitetName = splitLocationName(name)
		setLocationName(splitetName)
		setInputLocation(name)
		closeModal()
	}

	console.log(inputIsFeatured)
	console.log(inputPrice)
	console.log(inputCountry)
	console.log(inputState)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const imgURL = await saveAndGetImage(inputImage, 'products')
		console.log(imgURL)

		// let categories = []

		// for (const categoryChecked of Object.keys(categoriesChecked)) {
		// 	if (categoriesChecked[categoryChecked]) {
		// 		const category = categoriesInfo.categories.find((cat) => cat.name === categoryChecked)
		// 		if (category) {
		// 			const { idCategory, name } = category
		// 			categories = [...categories, { idCategory, name }]
		// 		}
		// 	}
		// }

		// const product = {
		// 	name: inputName,
		// 	description: inputDescription,
		// 	image: inputImage,
		// 	price: inputPrice,
		// 	location: inputLocation,
		// 	state: inputState,
		// 	isFeatured: inputIsFeatured,
		// 	categories: categories,
		// 	idUser: userId,
		// 	idCountry: inputCountry,
		// }

		// console.log(product)

		// dispatch(fetchPostProductAsync(product))
		alert('producto ingresado')
	}

	return (
		<div className='flex justify-center items-center '>
			<form onSubmit={handleSubmit} className='bg-gray_medium shadow-md rounded-md h-600 w-700 p-8'>
				<Input
					type='text'
					name='name'
					value={inputName}
					placeholder='Name...'
					onchange={handleChange}
					label='Name: '
				/>

				<Input
					type='text'
					name='description'
					value={inputDescription}
					placeholder='Description...'
					onchange={handleChange}
					label='Description: '
				/>

				<Input
					type='file'
					name='image'
					// value={inputImage}
					placeholder='Image URL...'
					onchange={handleInputFile}
					label='Image URL: '
				/>

				<Input
					type='number'
					name='price'
					value={''}
					placeholder='Price...'
					onchange={handleChange}
					label='Price: '
				/>

				<CustomSelect
					handleOpenClose={handleOpenModal}
					isOpen={isOpen}
					label='Country'
					positionLabel='left'
					messageSelect={countryName || 'Select Country'}>
					{/* <SelectCustomOption label='All countries' onclick={handleReset} /> */}
					{countriesInfo.countries.map((country) => (
						<SelectCustomOption
							key={country.idCountry}
							label={country.name}
							onclick={() => handleSelect(country.idCountry, country.geonameId, country.name)}
						/>
					))}
				</CustomSelect>
				{dataStates.length ? (
					<CustomSelect
						handleOpenClose={handleOpenModal}
						isOpen={isOpen}
						label='State'
						positionLabel='left'
						messageSelect={stateName || 'Select state'}>
						{dataStates.map((state) => (
							<SelectCustomOption
								key={state.geonameId}
								label={splitLocationName(state.adminName1)}
								onclick={() => handleStateSelect(state.geonameId, state.adminName1)}
							/>
						))}
					</CustomSelect>
				) : (
					<CustomSelect
						handleOpenClose={handleOpenModal}
						isOpen={isOpen}
						label='State'
						positionLabel='left'
						messageSelect={'Select State'}></CustomSelect>
				)}

				{stateApiId && dataLocations.length ? (
					<CustomSelect
						handleOpenClose={handleOpenModal}
						isOpen={isOpen}
						label='Location'
						positionLabel='left'
						messageSelect={locationName || 'Select Location'}>
						{dataLocations.map((loc) => (
							<SelectCustomOption
								key={loc.geonameId}
								label={splitLocationName(loc.name)}
								onclick={() => handleLocationSelect(loc.name)}
							/>
						))}
					</CustomSelect>
				) : (
					<CustomSelect
						handleOpenClose={handleOpenModal}
						isOpen={isOpen}
						label='Location'
						positionLabel='left'
						messageSelect={'Select Location'}></CustomSelect>
				)}

				<div className='w-full'>
					<label htmlFor='isFeatured' className='block mb-2'>
						Is featured:
					</label>
					<input
						type='checkbox'
						name='isFeatured'
						id='isFeatured'
						checked={inputIsFeatured}
						className='mr-2'
						onChange={handleChange}
					/>
				</div>

				{categoriesInfo.categories.length && categoriesInfo.status === 'success' ? (
					<div className='flex flex-col'>
						<p>Categoría</p>
						{categoriesInfo.categories.map((category) => (
							<label key={category.idCategory} className='flex items-center'>
								<span className='capitalize	'>{category.name}</span>
								<input
									className='ml-auto mr-2'
									type='checkbox'
									name='category'
									id={category.idCategory}
									value={category.name}
									checked={categoriesChecked[`${category.name}`]}
									onChange={handleChange}
								/>
							</label>
						))}
					</div>
				) : (
					<p>Loading...</p>
				)}

				<button type='submit' className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md '>
					Submit Product
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
