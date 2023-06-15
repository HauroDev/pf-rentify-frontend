import SelectInput from '../SelectInput'
import SearchBtn from './SearchBtn'
import logoImg from '../../assets/image/logo-rentify.png'

const Sidenav = () => {
	return (
		<nav className='min-h-full w-52 p-4 fixed z-10 bg-body_light dark:bg-body_dark'>
			<div className='w-full mb-8'>
				<img src={logoImg} alt='rentify logo' />
			</div>

			<section className='w-full flex flex-col gap-6'>
				<SearchBtn />

				<div>
					<SelectInput label='Country' name='location' />
				</div>
				<div>
					<SelectInput label='Category' name='categories' />
				</div>
				<div>
					<SelectInput label='Order' name='order' />
				</div>
			</section>
		</nav>
	)
}

export default Sidenav
