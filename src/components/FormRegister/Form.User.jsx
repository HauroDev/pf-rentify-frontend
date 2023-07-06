import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Input from '../Input'
import logoImg from '../../assets/image/logo-rentify.png'
import validation from '../../utils/validation'
import GoogleIcon from '../icons/google'
import { CreatePostUser, CreateUserGoogle } from '../../app/features/user/userSlice'
import { localStorageItems } from '../../utils/localStorageItems'
import Loader from '../Loader'
import GoogleButtonSection from '../GoogleButtonSection'
import { routesName } from '../../utils/routes_name'
import { ToastContext } from '../../context/ToastContext'
const FormUser = () => {
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const [submitted,setSubmitted]=useState(false)
	const { addToast } = useContext(ToastContext);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [error, setError] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	useEffect(() => {
		if (userState.status === 'error'&& submitted ) {
			 addToast({
				title: 'Error',
				description: userState.error,
				type: 'danger',
			})
			setSubmitted(false)
		}
	}, [userState.status,submitted])

	useEffect(() => {
		if (userState.status === 'success') {
			localStorage.setItem(
				localStorageItems.userAuth,
				JSON.stringify({ login: true, user: userState.user })
			)
		}
	}, [userState.status])

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
		setError(
			validation({
				...formData,
				[event.target.name]: event.target.value,
			})
		)
	}

	const handleSumit = async (event) => {
		event.preventDefault()
		setSubmitted(true)
		try {
			if (!formData.email || !formData.password || !formData.confirmPassword) {
				setError({ password: 'Please fill in all fields' })
				return
			}
			if (formData.password !== formData.confirmPassword) {
				setError({ confirmPassword: 'Passwords do not match' })
				return
			}

			dispatch(CreatePostUser({ email: formData.email, password: formData.password }))
		} catch (error) {
	
		}
	}

	const handleSignUpGoogle = async () => {
		setSubmitted(true)
		try {
			dispatch(CreateUserGoogle({ email: formData.email, password: formData.password }))
		} catch (error) {
	
		}
	}
	return (
		<div className='relative min-h-screen flex flex-col items-center bg-gra-100  dark:bg-body_dark py-10 overflow-hidden'>
			<div className='relative w-11/12 min-w-[300px] md:max-w-xl  dark:bg-body_dark'>
				<div className='absolute bg-purple-500 shadow-lg  w-full h-full rounded-2xl  transform rotate-6 md:transform md:rotate-6'></div>
				<div className='relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md dark:bg-card_dark '>
					<form className='px-4 sm:px-10 pt-8 pb-4 sm:pt-16 sm:pb-8 mb-4' onSubmit={handleSumit}>
						<img src={logoImg} alt='rentify logo' className='mx-auto mb-8' />
						<h1 className='block mt-3  text-gray-700 text-4xl text-center font-semibold mb-8  dark:text-white'>
							Sign Up
						</h1>
						<Input
							type='text'
							name='email'
							placeholder='Enter your email'
							label='Email'
							value={formData.email}
							onchange={handleChange}
						/>
						<div className=' text-red-700'>{error.email && <p>{error.email}</p>}</div>
						<Input
							type='password'
							name='password'
							placeholder='Enter your password'
							label='Password'
							value={formData.password}
							onchange={handleChange}
						/>
						<div className=' text-red-700'>{error?.password && <p>{error?.password}</p>}</div>

						<Input
							type='password'
							name='confirmPassword'
							placeholder='Enter your confirm Password'
							label='Confirm Password'
							value={formData.confirmPassword}
							onchange={handleChange}
						/>
						<div className=' text-red-700'>
							{error?.confirmPassword && <p>{error?.confirmPassword}</p>}
						</div>
						<div className='text-center my-3 flex justify-center'>
							<button
								type='submit'
								className='flex justify-center items-center bg-dark_purple dark:bg-light_purple dark:text-dark_purple text-white text-lg dark:hover:bg-med hover:bg-medium_purple dark:hover:bg-medium_purple dark:hover:text-white rounded-md px-6 py-2 hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-110'
								disabled={userState.status === 'loading'}>
								{userState.status === 'loading' ? <Loader size='sm' /> : 'Continue'}
							</button>
						</div>
						<div className='bg-gray-300 w-full my-4 py-[1px] rounded-md '></div>

						<GoogleButtonSection label='Sign up with' onclick={handleSignUpGoogle} />

						<div className='mt-7'>
							<div className='flex justify-center items-center'>
								<span className='mr-2'>
									{' '}
									Already have an account?{' '}
									<Link
										to={routesName.login}
										className='text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
										Log in
									</Link>
								</span>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default FormUser
