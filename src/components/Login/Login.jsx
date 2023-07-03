import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoginUserDB, LoginUserGoogle } from '../../app/features/user/userSlice'
import { routesName } from '../../utils/routes_name'
import validationLogin from '../../utils/validacionLogin'
import logoImg from '../../assets/image/logo-rentify.png'
import logoGoogle from '../../assets/image/google_logo.png'
import Loader from '../Loader'
import Input from '../Input'
import { ToastContext } from '../../context/ToastContext'
import GoogleButtonSection from '../GoogleButtonSection'

const LoginUser = () => {
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const { addToast } = useContext(ToastContext)
	const [login, setLogin] = useState({
		email: '',
		password: '',
	})

	const [error, setError] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		if (userState.status === 'error') {
			return addToast({
				title: 'Error',
				description: userState.error,
				type: 'danger',
			})
		}
	}, [userState.status])

	const handleChange = (event) => {
		setLogin({
			...login,
			[event.target.name]: event.target.value,
		})
		setError(
			validationLogin({
				...login,
				[event.target.name]: event.target.value,
			})
		)
		//faltan errores validacio
	}
	const handleSumit = (event) => {
		event.preventDefault()
		if (error.email || error.password) {
			return
		}
		try {
			//falta la ruta
			dispatch(LoginUserDB({ email: login.email, password: login.password }))
		} catch (errors) {
			console.log(errors.code)
		}
	}

	const handleSignUpGoogle = async () => {
		try {
			dispatch(LoginUserGoogle({ email: login.email, password: login.password }))
			console.log('google')
		} catch (error) {
			console.log(error.code)
			console.log(error.message)
		}
	}

	return (
		<div className='relative min-h-screen flex flex-col items-center bg-gra-100  dark:bg-body_dark py-10 overflow-hidden'>
			<div className='relative w-11/12 min-w-[300px] md:max-w-xl  dark:bg-body_dark'>
				<div className='absolute bg-purple-500 shadow-lg  w-full h-full rounded-2xl  transform -rotate-6'></div>
				<div className='relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md dark:bg-card_dark '>
					{/* <img src="../"  alt="Logo" className="mx-auto mb-8" /> */}
					<form onSubmit={handleSumit} className='px-4 sm:px-10 pt-8 pb-4 sm:pt-16 sm:pb-8 mb-4'>
						<img src={logoImg} alt='rentify logo' className='mx-auto mb-8' />
						<h1 className='text-2xl font-semibold text-center'>Login</h1>
						<div className='relative'>
							<label>Email</label>
							<Input
								type='text'
								name='email'
								placeholder='Email address'
								value={login.email}
								onchange={handleChange}
							/>
							<div className=' text-red-700'>{error.email && <p>{error.email}</p>}</div>
						</div>
						<div className='relative '>
							<label>Password</label>
							<Input
								type='password'
								name='password'
								placeholder='Password'
								value={login.password}
								onchange={handleChange}
							/>
							<div className=' text-red-700'>{error?.password && <p>{error?.password}</p>}</div>
						</div>
						<div className='text-center my-3 flex justify-center'>
							<button
								type='submit'
								className='flex justify-center items-center bg-dark_purple dark:bg-light_purple dark:text-dark_purple text-white text-lg dark:hover:bg-med hover:bg-medium_purple dark:hover:bg-medium_purple dark:hover:text-white rounded-md px-6 py-2 hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-110'
								disabled={userState.status === 'loading'}>
								{userState.status === 'loading' ? <Loader size='sm' /> : 'Continue'}
							</button>
						</div>
						<div className='bg-gray-300 w-full my-1 py-[1px] rounded-md '></div>
						<GoogleButtonSection label='Login with' onclick={handleSignUpGoogle} />
						<div className='mt-7'>
							<div className='flex justify-center items-center'>
								<span className='mr-2'>
									Don&apos;t have an account?{' '}
									<Link
										to={routesName.signup}
										className='text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
										Sign up
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
export default LoginUser
