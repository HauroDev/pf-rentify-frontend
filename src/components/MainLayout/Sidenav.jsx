import SelectInput from '../SelectInput'
import SearchBtn from './SearchBtn'

const Sidenav = () => {
	return (
		<nav className='min-h-full w-52 p-4 fixed z-10 bg-body_light dark:bg-body_dark'>
			<h2 className='font-amaranth text-4xl mb-8'>LOGO</h2>

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
