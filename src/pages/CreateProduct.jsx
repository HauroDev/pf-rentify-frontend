import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect, useContext } from 'react'
import { useModal } from '../hooks/useModal'
import { useNavigate } from 'react-router-dom'
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
import AddCrossIcon from '../components/icons/AddCrossIcon';
import CloseIconCategories from '../components/icons/CloseIconCategories'

import { ToastContext } from '../context/ToastContext'
import { routesName } from '../utils/routes_name'

const CreateProduct = () => {
	//const userId = '9411cbbd-e3a0-4f98-9437-e71ca67f6ca0'
	const [userId, setUserId] = useState('')

	//country/state
	const [isOpenCountry, openModalCountry, closeModalCountry] = useModal()
	const [isOpenState, openModalState, closeModalState] = useModal()
	const [isOpenLocation, openModalLocation, closeModalLocation] = useModal()
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

	const { addToast } = useContext(ToastContext)
	const navigate = useNavigate()

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

	//funcion modales para contry, state y location
	const handleOpenModalCountry = () => {
		if (isOpenCountry) closeModalCountry()
		else openModalCountry()
	}
	const handleOpenModalState = () => {
		if (isOpenState) closeModalState()
		else openModalState()
	}
	const handleOpenModalLocation = () => {
		if (isOpenLocation) closeModalLocation()
		else openModalLocation()
	}

	//
	// console.log(categoriesInfo)
	// console.log(countriesInfo)
	// console.log(dataStates)
	// console.log(dataLocations)
	// console.log(userState);

	//
	useEffect(() => {
		if (userState.status === 'success') {
			setUserId(userState.user.idUser)
		}
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
	}, [countryApiId, stateApiId, userState])

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
	const [inputCategoriesErrors, setInputCategoriesErrors] = useState('')

	// Estados para las propiedades de input
	const [inputName, setInputName] = useState('')
	const [inputDescription, setInputDescription] = useState('')
	const [inputImage, setInputImage] = useState('')
	const [imageToSubmit, setImageToSubmit] = useState(null)
	const [inputPrice, setInputPrice] = useState('')
	const [inputCountry, setInputCountry] = useState(null)
	const [inputLocation, setInputLocation] = useState('')
	const [inputState, setInputState] = useState('')
	const [inputIsFeatured, setInputIsFeatured] = useState(false)

	// Estados para los mensajes de error de cada propiedad
	const [inputNameError, setInputNameError] = useState('')
	const [inputDescriptionError, setInputDescriptionError] = useState('')
	const [inputImageError, setInputImageError] = useState('')
	const [inputPriceError, setInputPriceError] = useState('')
	const [inputCountryError, setInputCountryError] = useState('')
	const [inputLocationError, setInputLocationError] = useState('')
	const [inputStateError, setInputStateError] = useState('')
	

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		switch (name) {
			case 'name':
				setInputName(value)
				setInputNameError(validationProducts(name, value))
				break

			case 'description':
				setInputDescription(value)
				setInputDescriptionError(validationProducts(name, value))
				break

			// case 'image':
			// 	setInputImage(value)
			// 	break

			case 'price':
				setInputPrice(parseFloat(value))
				setInputPriceError(validationProducts(name, parseFloat(value)))
				break

			case 'isFeatured':
				setInputIsFeatured(checked)
				break

			case 'category':
				// setCategoriesChecked((prevInput) => ({
				// 	...prevInput,
				// 	[value]: checked,
				// }))
				setCategoriesChecked((prevInput) => {
					const newInput = {
						...prevInput,
						[value]: checked,
					} 
					return (function(){
						setInputCategoriesErrors(validationProducts('category', newInput))
						return newInput
					})()
				})
				
				//errors en  12 lineas más abajo
				break

			default:
				break
		}
	}

	// useEffect(() => {
	// 	setInputCategoriesErrors(validationProducts('category', categoriesChecked))
	// }, [categoriesChecked])
	console.log(categoriesChecked );

	const handleInputFile = (event) => {
		setImageToSubmit(event.target.files[0])
		setInputImageError(validationProducts(event.target.name, event.target.files[0]))
		console.log(imageToSubmit)
	}
	//manejo del input countries
	const handleSelect = (id, idApi, name) => {
		setCountryApiId(idApi)
		setCountryName(name)
		setInputCountry(id)
		setInputCountryError(validationProducts('country', id))
		setStateName('')
		setInputState('')
		setLocationName('')
		setInputLocation('')
		closeModalCountry()
	}

	//manejo input state
	const handleStateSelect = (idApi, name) => {
		const splitetName = splitLocationName(name)
		setStateApiId(idApi)
		setStateName(splitetName)
		setInputState(name)
		setInputStateError(validationProducts('state', name))
		setLocationName('')
		setInputLocation('')
		closeModalState()
	}
	//manejo input location
	const handleLocationSelect = (name) => {
		const splitetName = splitLocationName(name)
		setLocationName(splitetName)
		setInputLocation(name)
		setInputLocationError(validationProducts('location', name))
		closeModalLocation()
	}
	
	
	// console.log(inputIsFeatured)
	// console.log(inputPrice)
	// console.log(inputCountry)
	// console.log(inputState)
	// console.log(userId);

	const handleSubmit = async (e) => {
		e.preventDefault()

		let categories = []

		for (const categoryChecked of Object.keys(categoriesChecked)) {
			if (categoriesChecked[categoryChecked]) {
				const category = categoriesInfo.categories.find((cat) => cat.name === categoryChecked)
				if (category) {
					const { idCategory, name } = category
					categories = [...categories, { idCategory, name }]
				}
			}
		}

		const product = {
			name: inputName,
			description: inputDescription,
			image: inputImage,
			price: inputPrice,
			location: inputLocation,
			state: inputState,
			isFeatured: inputIsFeatured,
			categories: categories,
			idUser: userId,
			idCountry: inputCountry,
		}

		//validacion country, state,country:
		// setInputImageError(imageToSubmit)
		setInputNameError(validationProducts('name', inputName))
		setInputDescriptionError(validationProducts('description', inputDescription))
		setInputPriceError(validationProducts('price',inputPrice))
		setInputCountryError(validationProducts('country', inputCountry))
		setInputStateError(validationProducts('state', inputState))
		setInputLocationError(validationProducts('location', inputLocation))
		setInputCategoriesErrors(validationProducts('category', categoriesChecked))

		const hasNotErrors = () => {
			return (
				inputNameError ||
				inputDescriptionError ||
				inputImageError ||
				inputPriceError ||
				inputCountryError ||
				inputLocationError ||
				inputStateError ||
				inputCategoriesErrors
			)
		}

		if (imageToSubmit && !hasNotErrors()) {
			const imgURL = await saveAndGetImage(imageToSubmit, 'products')
			setInputImage(imgURL)
			const updatedProduct = { ...product, image: imgURL }
			console.log(product)
			console.log(updatedProduct)
			dispatch(fetchPostProductAsync(updatedProduct))
			addToast({
				title: 'Success',
				description: `${product.name} was added successfully`,
				type: 'success',
			})
			navigate(routesName.home)
		} else {
			// alert('Please enter the required spaces correctly 🙃😬')
			addToast({
				title: 'Error',
				description: `${product.name} couldn't be added`,
				type: 'danger',
			})
		}
	}

	return (
		<div className='flex justify-center items-center '>
			<form
				onSubmit={handleSubmit}
				className='bg-gray_medium dark:bg-card_dark shadow-md rounded-md h-600 w-700 p-8'>
				<Input
					type='text'
					name='name'
					value={inputName}
					placeholder='Name...'
					onchange={handleChange}
					label='Name: '
				/>
				{inputNameError ? <span className="text-red-500">{inputNameError}</span> : null}

				<Input
					type='text'
					name='description'
					value={inputDescription}
					placeholder='Description...'
					onchange={handleChange}
					label='Description: '
				/>
				{inputDescriptionError ? <span className="text-red-500">{inputDescriptionError}</span> : null}

				<Input
					type='file'
					name='image'
					placeholder='Image URL...'
					onchange={handleInputFile}
					label='Image URL: '
				/>
				{inputImageError ? <span className="text-red-500">{inputImageError}</span> : null}

				<Input
					type='number'
					name='price'
					value={inputPrice}
					placeholder='Price...'
					onchange={handleChange}
					label='Price: '
				/>
				{inputPriceError ? <span className="text-red-500">{inputPriceError}</span> : null}

				<CustomSelect
					handleOpenClose={handleOpenModalCountry}
					isOpen={isOpenCountry}
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
				{inputCountryError ? <span className="text-red-500">{inputCountryError}</span> : null}

				{dataStates.length ? (
					<CustomSelect
						handleOpenClose={handleOpenModalState}
						isOpen={isOpenState}
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
						handleOpenClose={handleOpenModalState}
						isOpen={isOpenState}
						label='State'
						positionLabel='left'
						messageSelect={'Select State'}></CustomSelect>
				)}
				{inputStateError ? <span className="text-red-500">{inputStateError}</span> : null}

				{stateApiId && dataLocations.length ? (
					<CustomSelect
						handleOpenClose={handleOpenModalLocation}
						isOpen={isOpenLocation}
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
						handleOpenClose={handleOpenModalLocation}
						isOpen={isOpenLocation}
						label='Location'
						positionLabel='left'
						messageSelect={'Select Location'}></CustomSelect>
				)}
				{inputLocationError ? <span className="text-red-500">{inputLocationError}</span> : null}

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
				{
					inputCategoriesErrors
					?<p className="text-red-500">{inputCategoriesErrors}</p>
					:null
				}
				
				<button type='submit' className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md '>
					Submit Product
				</button>
			</form>
		</div>
	)
}

export default CreateProduct
