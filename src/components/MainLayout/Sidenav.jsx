import SelectInput from '../SelectInput'
import SearchInput from './SearchInput'

const Sidenav = () => {
	return (
		<nav className='min-h-full md:w-[171px] lg:w-2/12 p-4 fixed'>
			<h2 className='font-amaranth text-4xl mb-8'>LOGO</h2>

			<section className='w-10/12 flex flex-col gap-6'>
				<SearchInput />

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
