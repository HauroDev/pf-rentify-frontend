import { useNavigate } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import bg404 from '../assets/image/404.jpg'
import ArrowLeft from '../components/icons/ArrowLeft'

const Page404 = () => {
	const navigate = useNavigate()

	const handleNavHome = () => {
		navigate(routesName.home)
	}
	return (
		<div
			style={{ backgroundImage: `url("${bg404}")` }}
			className='blur-in-expand w-full min-h-screen bg-cover bg-center bg-modal_bg_50'>
			<div className='bg-modal_bg_80 w-full min-h-screen py-52 px-8 flex flex-col gap-16'>
				<section className='scale-up-top flex flex-col gap-8'>
					<p className='text-white text-center'>404</p>
					<h2 className='text-5xl text-white text-center'>Page not found</h2>
					<p className='text-white text-center'>
						Sorry, we couldn’t find the page you’re looking for.
					</p>
				</section>

				<div className='w-28 mx-auto'>
					<button
						onClick={handleNavHome}
						className=' text-white rounde-md hover:scale-110 transition flex items-center gap-2'>
						<ArrowLeft className='w-4 h-4 stroke-white' />
						<span>Go to Home</span>
					</button>
				</div>

				<div className='absolute bottom-2 right-4 text-gray_dark text-xs'>
					Imagen de{' '}
					<a
						href='https://www.freepik.es/foto-gratis/mesa-madera-mirando-bar-vacia-borrosa_1355248.htm#page=2&query=empty&position=32&from_view=search&track=sph'
						rel='noreferrer'
						target='_blank'>
						Freepik
					</a>
				</div>
			</div>
		</div>
	)
}

export default Page404
