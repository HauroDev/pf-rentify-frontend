/* eslint-disable react/prop-types */
import logoGoogle from '../assets/image/google_logo.png'

const GoogleButtonSection = ({ label, onclick }) => {
	return (
		<section className='mt-4'>
			<p className='block font-medium text-sm text-center text-gray-600 w-full dark:text-white'>
				{label}
			</p>

			<div className='flex mt-7 justify-center w-full'>
				<button
					type='button'
					onClick={onclick}
					className='hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-110'>
					<img src={logoGoogle} alt='Sign in with google' />
				</button>
			</div>
		</section>
	)
}

export default GoogleButtonSection
