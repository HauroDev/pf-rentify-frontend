import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input'
import { useEffect, useState } from 'react'
import logoImg from '../../assets/image/logo-rentify.png'
import GoogleIcon from '../icons/google'
import { LoginUserDB, LoginUserGoogle } from '../../app/features/user/userSlice'
import { localStorageItems } from '../../utils/localStorageItems'

const LoginUser = () => {
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const [login, setLogin] = useState({
		email: '',
		password: '',
	})
	useEffect(() => {
		if (userState.status === 'success') {
			localStorage.setItem(
				localStorageItems.userAuth,
				JSON.stringify({ user: userState.user, login: true })
			)
		}
	}, [userState.status])

	const handleChange = (event) => {
		setLogin({
			...login,
			[event.target.name]: event.target.value,
		})
		//faltan errores validacio
	}
	const handleSumit = (event) => {
		try {
			event.preventDefault()
			console.log(login)
			//falta la ruta
			dispatch(LoginUserDB({ email: login.email, password: login.password }))
		} catch (error) {
			console.log(error.code)
			console.log(error.message)
		}
	}

	const handleSignUpGoogle = async () => {
		try {
			dispatch(LoginUserGoogle({ email: login.email, password: login.password }))
		} catch (error) {
			console.log(error.code)
			console.log(error.message)
		}
	}

	return (
		<div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 dark:bg-body_dark'>
			<div className='relative py-3 sm:max-w-xl sm:mx-auto'>
				<div className='absolute inset-0 bg-purple-500  shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
				<div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 dark:bg-body_dark'>
					<img src={logoImg} alt='rentify logo' className='mx-auto mb-8' />
					{/* <img src="../"  alt="Logo" className="mx-auto mb-8" /> */}
					<form onSubmit={handleSumit}>
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
						</div>
						<div className='relative '>
							<label>Password</label>
							<Input
								type='text'
								name='password'
								placeholder='Password'
								value={login.password}
								onchange={handleChange}
							/>
						</div>
						<div className='relative text-center py-3'>
							<button
								type='submit'
								className='bg-blue-500 text-white rounded-md px-6 py-1 hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-110'>
								Enter
							</button>
						</div>
					</form>
					<div className='bg-gray-300 w-full my-1 py-[1px] rounded-md '></div>
					<label className='block font-medium text-sm text-gray-600 w-full dark:text-white'>
						login with
					</label>

					<div className='flex mt-7 justify-center w-full'>
						<button
							onClick={handleSignUpGoogle}
							className='hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-150'>
							<GoogleIcon className='mr-2' />
						</button>
					</div>

					<div className='mt-7'>
						<div className='flex justify-center items-center'>
							<label className='mr-2'> You don&apos;t have an account yet?</label>
							<a
								href='/signup'
								className='text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
								Register
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default LoginUser
