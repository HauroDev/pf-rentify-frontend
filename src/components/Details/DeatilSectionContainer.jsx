/* eslint-disable react/prop-types */

const DeatilSectionContainer = ({ children }) => {
	return (
		<section className='w-full grid xl:grid-cols-2 justify-center content-center md:items-start gap-8 xl:gap-12'>
			{children}
		</section>
	)
}

export default DeatilSectionContainer
