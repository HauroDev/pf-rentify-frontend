import { useForm } from 'react-hook-form'
import { useContext, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContext } from '../context/ToastContext'
import { fetchGetAllCategoriesAsync } from '../app/features/categories/categoriesSlice'
import { fetchGetAllCountriessAsync } from '../app/features/countries/countriesSlice'
import { fetchPostProductAsync } from '../app/features/products/productsSlice'
import { saveAndGetImage } from '../services/imageFirebaseService'
import { getCountryStates } from '../services/locationService';
import ArrowUpCrPr from "../components/icons/ArrowUpCrPr";
import ArrowDownCrPr from "../components/icons/ArrowDownCrPr"

const CreateProduct = () => {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
		trigger,
	} = useForm()

	const categoriesInfo = useSelector((state) => state.categories)
	const countriesInfo = useSelector((state) => state.countries)
	const userinfo = useSelector((state) => state.user)

	const { addToast } = useContext(ToastContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [userId, setUserId] = useState('');

	const [countryApiId, setCountryApiId] = useState(null)
	const [dataStates, setDataStates] = useState([])

	const [stateApiId, setStateApiId] = useState(null)
	const [dataLocations, setDataLocations] = useState([])

	const [isLoading, setIsLoading] = useState(false);

	const [isExpanded, setIsExpanded] = useState(false);

	const toggleDropdown = () => {
		setIsExpanded(!isExpanded);
	};
	console.log(isExpanded);
	const getDataState = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataStates(data)
		} catch (error) {
			console.log(error)
		}
	}
console.log(userinfo);
	const getDataLocation = async (id) => {
		try {
			const data = await getCountryStates(id)
			setDataLocations(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (userinfo.status === 'success') {
			setUserId(userinfo.user.idUser)
		}
		if (!categoriesInfo.categories.length) {
			dispatch(fetchGetAllCategoriesAsync())
		}
		if (!countriesInfo.countries.length) {
			dispatch(fetchGetAllCountriessAsync())
		}
		if (countryApiId) {
			setDataStates([])
			getDataState(countryApiId)
		}
		if (stateApiId) {
			setDataLocations([])
			getDataLocation(stateApiId)
		}
	}, [countryApiId, stateApiId, userinfo])

	const handleCountrySelect = (e) => {
		trigger('country')
		const selectedOption = e.target.options[e.target.selectedIndex].getAttribute('data-geonameid')
		setCountryApiId(selectedOption)
		setValue('state', '')
	}
	// console.log(watch('country'))
	// console.log(watch('state'))
	// console.log(watch('location'))

	const handleStateSelect = (e) => {
		trigger('state')
		const selectedOption = e.target.options[e.target.selectedIndex].getAttribute('data-geonameid')
		// console.log(e.target.value)
		setStateApiId(selectedOption)
		setValue('location', '')
	}

	const handleLocationSelect = (e) => {
		trigger('location')
	}

	const validateFileSize = (file) => {
		const sizeInMB = 0.5
		const maxSizeInBytes = sizeInMB * 1024 * 1024

		if (file[0].size <= maxSizeInBytes) {
			return true
		} else {
			return 'El tamaño del archivo debe ser menor o igual a 0.5MB'
		}
	}

	const validateFileType = (file) => {
		const allowedTypes = ['image/jpeg', 'image/png']

		if (allowedTypes.includes(file[0].type)) {
			return true
		} else {
			return 'El archivo debe ser de tipo JPEG o PNG'
		}
	}

	const onSubmit = async (data) => {
		setIsLoading(true)
		console.log(data)
		const filteredCategories = [...categoriesInfo.categories]
			.filter((category) => data.categories.includes(String(category.idCategory)))
			.map((category) => ({ idCategory: category.idCategory, name: category.name }))
		const product = {
			name: data.name,
			description: data.description,
			image: '',
			price: parseFloat(data.price),
			location: data.location,
			state: data.state,
			isFeatured: data.isFeatured,
			categories: filteredCategories,
			idUser: userId,
			idCountry: parseFloat(data.country),
		}

		console.log(product)
		try {
			const imgURL = await saveAndGetImage(data.image[0], 'products')
			console.log(imgURL)
			if (!imgURL) {
				throw Error('Firebase Error')
			}
			const updatedProduct = { ...product, image: imgURL }
			console.log(updatedProduct)
			const response = await dispatch(fetchPostProductAsync(updatedProduct))

			if (!response.payload) {
				throw Error(`Api error`)
			}
			setIsLoading(false)
			addToast({
				title: 'Success',
				description: `${product.name} was added successfully`,
				type: 'success',
			})
		} catch (error) {
			setIsLoading(false)
			addToast({
				title: `${error.message}`,
				description: `${product.name} couldn't be added`,
				type: 'danger',
			})
		}
	}
	return (
		<div className='container mx-auto flex items-center justify-center '>
			<div className='bg-gray_medium dark:bg-card_dark w-1/2 p-4 rounded-md shadow-xl'>
				<h2 className='text-2xl font-bold mb-4'>Post a product</h2>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					{/*  name */}
					<div>
						<label htmlFor='name' className='block font-bold mb-1'>
							Name:
						</label>
						<input
							type='text'
							id='name'
							{...register('name', {
								required: true,
								maxLength: 40,
								minLength: 3,
								pattern: /^[\wñÑ\s\d]+$/u,
								onChange: () => {
									trigger('name')
								},
							})}
							aria-invalid={errors.name ? 'true' : 'false'}
							className={`dark:bg-body_dark w-full border rounded px-2 py-1 ${
								errors.name ? 'border-red-500' : 'border-gray-300'
							}`}
						/>
						{errors.name && errors.name.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Name is required
							</p>
						)}
						{errors.name && errors.name.type === 'maxLength' && (
							<p role='alert' className='text-red-500 text-sm'>
								Product name must be less than 40 characters
							</p>
						)}
						{errors.name && errors.name.type === 'minLength' && (
							<p role='alert' className='text-red-500 text-sm'>
								Product name have more than 3 characters
							</p>
						)}
						{errors.name && errors.name.type === 'pattern' && (
							<p role='alert' className='text-red-500 text-sm'>
								Product name can only contain letters and numbers
							</p>
						)}
					</div>

					{/* description */}
					<div>
						<label htmlFor='description' className='block font-bold mb-1'>
							Description:
						</label>
						<textarea
							id='description'
							{...register('description', {
								required: true,
								maxLength: 1200,
								onChange: () => {
									trigger('description')
								},
							})}
							aria-invalid={errors.description ? 'true' : 'false'}
							className={`w-full dark:bg-body_dark border rounded px-2 py-1 ${
								errors.description ? 'border-red-500' : 'border-gray-300'
							}`}
						/>
						{errors.description && errors.description.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Description is required
							</p>
						)}
					</div>

					{/* image */}
					<div>
						<label htmlFor='image' className='block font-bold mb-1'>
							Suba una imagen:
						</label>
						<input
							type='file'
							id='image'
							{...register('image', {
								required: true,
								validate: { validateFileType, validateFileSize },
								onChange: () => {
									trigger('image')
								},
							})}
							aria-invalid={errors.image ? 'true' : 'false'}
							className={`border-2 ${
								errors.image ? 'border-red-500' : 'border-gray-300'
							} rounded-md block w-full text-base  text-slate-500
						file:mr-4 file:py-2 file:px-4 file:w-1/2 file:dark:bg-body_dark
						file:rounded-md file:border-0
						file:font-semibold
						file:bg-violet-50 file:text-violet-700 file:dark:text-violet-300
						hover:file:bg-violet-100 hover:file:cursor-pointer`}
						/>
						{errors.image && errors.image.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Image is required
							</p>
						)}
						{errors.image && errors.image.type === 'validateFileType' && (
							<p role='alert' className='text-red-500 text-sm'>
								{errors.image.message}
							</p>
						)}
						{errors.image && errors.image.type === 'validateFileSize' && (
							<p role='alert' className='text-red-500 text-sm'>
								{errors.image.message}
							</p>
						)}
					</div>

					{/* price */}
					<div>
						<label htmlFor='price' className='block font-bold mb-1'>
							Price per day:
						</label>
						<input
							type='number'
							id='price'
							{...register('price', {
								required: true,
								min: 0,
								onChange: () => {
									trigger('price')
								},
							})}
							aria-invalid={errors.price ? 'true' : 'false'}
							className={`w-1/2 dark:bg-body_dark border rounded px-2 py-1 ${
								errors.price ? 'border-red-500' : 'border-gray-300'
							}`}
						/>
						{errors.price && errors.price.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Price is required
							</p>
						)}
						{errors.price && errors.price.type === 'min' && (
							<p role='alert' className='text-red-500 text-sm'>
								Please enter a valid price, negative values are invalid
							</p>
						)}
					</div>

					<hr className='border-gray_dark' />
					{/* country */}
					<div>
						<label htmlFor='country' className='block font-bold mb-1'>
							Select Country:
						</label>
						{countriesInfo.countries.length ? (
							<select
								id='country'
								{...register('country', { required: true, onChange: handleCountrySelect })}
								aria-invalid={errors.country ? 'true' : 'false'}
								className={`w-1/2 dark:bg-body_dark  border rounded px-2 py-1 ${
									errors.country ? 'border-red-500' : 'border-gray-300'
								} hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500`}>
								<option value='' disabled>
									Countries
								</option>
								{countriesInfo.countries.map((country) => (
									<option
										key={country.idCountry}
										value={country.idCountry}
										data-geonameid={country.geonameId}>
										{country.name}
									</option>
								))}
							</select>
						) : (
							<select className={`w-1/2 border dark:bg-body_dark rounded px-2 py-1 border-gray-300`}>
								<option value=''>Loading Countries...</option>
							</select>
						)}
						{errors.country && errors.country.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Country is required
							</p>
						)}
					</div>

					{/* state */}
					<div>
						<label htmlFor='state' className='block font-bold mb-1'>
							Select State:
						</label>
						{dataStates.length ? (
							<select
								id='state'
								{...register('state', { required: true, onChange: handleStateSelect })}
								aria-invalid={errors.state ? 'true' : 'false'}
								// ! en verificación si es correcto o es una mala práctica
								value={watch('state') || ''}
								className={`w-1/2 dark:bg-body_dark border rounded px-2 py-1 ${
									errors.country ? 'border-red-500' : 'border-gray-300'
								} hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500`}>
								<option value='' disabled>
									States
								</option>
								{dataStates.map((state) => (
									<option key={state.geonameId} value={state.name} data-geonameid={state.geonameId}>
										{state.name}
									</option>
								))}
							</select>
						) : (
							<select className={`w-1/2 dark:bg-body_dark border rounded px-2 py-1 border-gray-300`}>
								<option value=''>Loading States...</option>
							</select>
						)}
						{errors.state && errors.state.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								State is required
							</p>
						)}
					</div>

					{/* location */}
					<div>
						<label htmlFor='location' className='block font-bold mb-1'>
							Select Location:
						</label>
						{dataLocations.length ? (
							<select
								id='location'
								{...register('location', { required: true, onChange: handleLocationSelect })}
								aria-invalid={errors.location ? 'true' : 'false'}
								className={`w-1/2 dark:bg-body_dark border rounded px-2 py-1 ${
									errors.country ? 'border-red-500' : 'border-gray-300'
								} hover:cursor-pointer focus:outline-none focus:ring focus:border-blue-500`}>
								<option value='' disabled>
									Locations
								</option>
								{dataLocations.map((location) => (
									<option
										key={location.geonameId}
										value={location.name}
										data-geonameid={location.geonameId}>
										{location.name}
									</option>
								))}
							</select>
						) : (
							<select className={`w-1/2 dark:bg-body_dark border rounded px-2 py-1 border-gray-300`}>
								<option value=''>Loading States...</option>
							</select>
						)}
						{errors.location && errors.location.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Location is required{' '}
							</p>
						)}
					</div>

					<hr className='border-gray_dark' />

					{/* categories */}
					<div>
						<div className='flex hover:cursor-pointer items-center justify-between w-1/2 border-b-2 px-1 py-1 '  onClick={toggleDropdown}>
							<label htmlFor='categories' className='font-bold mb-1 text-lg'>
								Select categories
							</label>
							<i>{isExpanded?<ArrowUpCrPr/>:<ArrowDownCrPr/>}</i>
						</div>
						{categoriesInfo.categories.length ? (
							<div className={`w-full flex flex-col ${isExpanded ? 'block' : 'hidden'}`}>
								{categoriesInfo.categories.map((category) => (
									<div key={category.idCategory} className='flex items-center w-1/2'>
										<input
											type='checkbox'
											id={category.idCategory}
											{...register('categories', {
												required: true,
												onChange: () => {
													trigger('categories')
												},
											})}
											value={category.idCategory}
											aria-invalid={errors.categories ? 'true' : 'false'}
											className='accent-dark_purple hover:cursor-pointer  h-4 w-4'
										/>
										<label htmlFor={category.idCategory} className='capitalize pl-2'>
											{category.name}
										</label>
									</div>
								))}
							</div>
						) : (
							<select className={`w-1/2 border rounded px-2 py-1 border-gray-300`}>
								<option value=''>Loading categories...</option>
							</select>
						)}
						{errors.categories && errors.categories.type === 'required' && (
							<p role='alert' className='text-red-500 text-sm'>
								Please select a category
							</p>
						)}
					</div>

					<hr className='border-gray_dark' />

					{
						userId
						?
							userinfo.user.membership === "premium"
							?
							<div>
								<label htmlFor='isFeatured' className='font-bold mb-1 pr-4'>
									Do you want to sponsor this product?
								</label>
								<input
									type='checkbox'
									id='isFeatured'
									{...register('isFeatured')}
									className='accent-dark_purple hover:cursor-pointer  h-4 w-4'
								/>
							</div>
							:
							null
						:
						null
					}

					<input
						type='submit'
						value='Submit Product'
						className='bg-dark_purple text-white text-lg py-2 px-6 rounded-md hover:bg-[#230069] hover:cursor-pointer '
					/>
				</form>
				{isLoading && <p>Loading...</p>}
			</div>
		</div>
	)
}

export default CreateProduct
