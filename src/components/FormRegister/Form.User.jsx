import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../Input'
import logoImg from '../../assets/image/logo-rentify.png'
import validation from '../../utils/validation'
import GoogleIcon from '../icons/google'
import { registerGoogle, registerUser } from '../../services/authSevice'
import { CreatePostUser, CreateUserGoogle } from '../../app/features/user/userSlice'

const FormUser = () => {
	const dispatch = useDispatch()
	const userState=useSelector(state=>state.user)
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
	useEffect(()=>{
		if(userState.status==='success')
		{
			localStorage.setItem('userAuth',JSON.stringify({ login:userState.login , user:userState.user}))
		}
	},[userState.status])	
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
		try {
			if (!formData.email || !formData.password || !formData.confirmPassword) {
				setError({ password: 'Please fill in all fields' });
				return;
			  }
			if (formData.password !== formData.confirmPassword) {
				setError('Passwords do not match')
				return;
			}
			// { email: formData.email, password: formData.password }
			dispatch(CreatePostUser(
				{ email: formData.email, password: formData.password }
			))

			console.log(user)
		} catch (error) {
			console.log(error.code)
			console.log(error.message)
		}
	}

	const handleSignUpGoogle = async () => {
		try {
			dispatch(CreateUserGoogle(
				{ email: formData.email, password: formData.password }
			))
		} catch (error) {
			console.log(error.code)
			console.log(error.message)
		}
	}
	return (
		<div className='relative min-h-screen flex flex-col justify-center items-center bg-gra-100  dark:bg-body_dark'>
			<div className='relative sm:max-w-sm w-full  dark:bg-body_dark'>
				<div className='card bg-violet-300 shadow-lg  w-full h-full rounded-2xl absolute  transform -rotate-12'></div>
				<div className='card bg-purple-500 shadow-lg  w-full h-full rounded-2xl absolute  transform rotate-12'></div>
				<div className='relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md dark:bg-body_dark '>
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
							type='confirmPassword'
							name='confirmPassword'
							placeholder='Enter your confirm Password'
							label='Confirm Password'
							value={formData.confirmpassword}
							onchange={handleChange}
						/>
						<div className=' text-red-700'>{error?.password && <p>{error?.password}</p>}</div>
						<div className='flex mt-7 justify-center w-full'>
							<button
								type='submit'
								className='bg-blue-700 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
								Check in
							</button>
						</div>
					</form>

					<div>
						<div className='bg-gray-300 w-full my-4 py-[1px] rounded-md '></div>

						<p className='text-center font-medium text-sm text-gray-600 w-full dark:text-white'>
							Sign up with
						</p>

						<div className='flex mt-3 justify-center w-full'>
							<button
								onClick={handleSignUpGoogle}
								className='hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-150'>
								<GoogleIcon className='mr-2' />
							</button>
						</div>

						<div className='mt-7'>
							<div className='flex justify-center items-center'>
								<label className='mr-2'> Do you have account?</label>
								<a
									href='/login'
									className='text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105'>
									Login
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormUser
