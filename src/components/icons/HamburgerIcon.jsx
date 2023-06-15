const HamburgerIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={28}
		height={28}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-menu-2'
		viewBox='0 0 24 24'
		{...props}>
		<path stroke='none' d='M0 0h24v24H0z' />
		<path d='M4 6h16M4 12h16M4 18h16' />
	</svg>
)
export default HamburgerIcon
