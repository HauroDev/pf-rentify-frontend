const Sidenav = () => {
	return (
		<nav className='min-h-full md:w-1/5 lg:w-2/12 p-4'>
			<h2 className='font-amaranth text-4xl'>LOGO</h2>

			<section>
				<div>
					<input type='text' placeholder='Search' />
				</div>
				<div>
					<select name='' id=''>
						<option value=''>Select paises</option>
					</select>
				</div>
				<div>
					<select name='' id=''>
						<option value=''>Select categories</option>
					</select>
				</div>
				<div>
					<select name='' id=''>
						<option value=''>Select sort</option>
					</select>
				</div>
			</section>
		</nav>
	)
}

export default Sidenav
