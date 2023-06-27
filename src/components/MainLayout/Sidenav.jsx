/* eslint-disable react/prop-types */
import SearchBtn from './SearchBtn'
import logoImg from '../../assets/image/logo-rentify.png'
import CloseIcon from '../icons/CloseIcon'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { routesName } from '../../utils/routes_name'
import SelectCategoryFilter from '../Selects/SelectCategoryFilter'
import SelectCountry from '../Selects/SelectCountry'
// import OrderSelect from '../Selects/OrderSelect'

const Sidenav = ({ isOpen, closeModal }) => {
	const { pathname } = useLocation()
	const modalOpenClasses = isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
	const menuOpenClasses = isOpen ? 'left-0' : 'left-[-100vh]'

	return (
		<>
			<div
				className={`min-h-full flex justify-end items-start p-4 w-full fixed z-20 bg-modal_bg_50 top-0 left-0 md:opacity-0 md:invisible ${modalOpenClasses} backdrop-blur`}>
				<button onClick={closeModal}>
					<CloseIcon className='stroke-white w-8 h-8' />
				</button>
			</div>

			<nav
				className={`flex flex-col justify-between h-full w-52 p-4 pb-14 fixed z-20 bg-body_light dark:bg-body_dark md:left-0 ${menuOpenClasses} transition-all overflow-auto scrollbar-thin scrollbar-thumb-light_purple scrollbar-thumb-rounded-md`}>
				<div>
					<div className='w-36 min-w-[130px] mb-8'>
						<Link to={routesName.home}>
							<img src={logoImg} alt='rentify logo' className='min-w-[130px]' />
						</Link>
					</div>
					<section className='w-full pr-4 flex flex-col gap-6 '>
						<SearchBtn />
						{pathname === routesName.home && (
							<>
								<SelectCountry />

								<SelectCategoryFilter />
							</>
						)}
						{pathname !== routesName.home && (
							<Link
								className='hover:text-dark_purple hover:font-bold dark:hover:text-light_purple transition-all'
								to='/'>
								Back to Home
							</Link>
						)}
					</section>
				</div>

				<section className='flex flex-col gap-4'>
					<NavLink
						to={routesName.pricing}
						className={({ isActive }) =>
							isActive
								? 'text-dark_purple font-bold dark:text-light_purple transition-all'
								: 'font-bold hover:text-dark_purple dark:hover:text-light_purple'
						}>
						Pricing
					</NavLink>
					<NavLink
						to={routesName['how-it-works']}
						className={({ isActive }) =>
							isActive
								? 'text-dark_purple font-bold dark:text-light_purple transition-all'
								: 'font-bold hover:text-dark_purple dark:hover:text-light_purple'
						}>
						How it works
					</NavLink>
					<NavLink
						to={routesName.faqs}
						className={({ isActive }) =>
							isActive
								? 'text-dark_purple font-bold dark:text-light_purple transition-all'
								: 'font-bold hover:text-dark_purple dark:hover:text-light_purple'
						}>
						FAQ&apos;S
					</NavLink>
				</section>
			</nav>
		</>
	)
}

export default Sidenav
