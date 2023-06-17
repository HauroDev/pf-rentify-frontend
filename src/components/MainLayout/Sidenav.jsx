/* eslint-disable react/prop-types */
import SelectInput from '../SelectInput'
import SearchBtn from './SearchBtn'
import logoImg from '../../assets/image/logo-rentify.png'
import CloseIcon from '../icons/CloseIcon'
import { Link, useLocation } from 'react-router-dom'
import { routesName } from '../../utils/routes_name'
import OrderSelect from '../Selects/OrderSelect'

const Sidenav = ({ isOpen, closeModal }) => {
	const { pathname } = useLocation()
	const modalOpenClasses = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
	const menuOpenClasses = isOpen ? 'left-0' : 'left-[-100vh]'

	return (
		<>
			<div
				className={`min-h-full flex justify-end items-start p-4 w-full fixed z-10 bg-modal_bg_50 top-0 left-0 md:opacity-0 md:invisible ${modalOpenClasses} backdrop-blur`}>
				<button onClick={closeModal}>
					<CloseIcon className='stroke-white w-8 h-8' />
				</button>
			</div>

			<nav
				className={`min-h-full w-52 p-4 fixed z-10 bg-body_light dark:bg-body_dark md:left-0 ${menuOpenClasses} transition-all`}>
				<div className='w-36 min-w-[130px] mb-8'>
					<img src={logoImg} alt='rentify logo' className='min-w-[130px]' />
				</div>
				<section className='w-full flex flex-col gap-6'>
					<SearchBtn />
					{pathname === routesName.home && (
						<div className='w-full flex flex-col gap-6'>
							<SelectInput label='Country' name='location' />

							<SelectInput label='Category' name='categories' />

							<OrderSelect />
						</div>
					)}
					{pathname !== routesName.home && (
						<Link
							className='hover:text-dark_purple hover:font-bold dark:hover:text-light_purple transition-all'
							to='/'>
							Back to Home
						</Link>
					)}
				</section>
			</nav>
		</>
	)
}

export default Sidenav
