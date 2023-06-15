const CloseIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={28}
		height={28}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-x'
		viewBox='0 0 24 24'
		{...props}>
		<path stroke='none' d='M0 0h24v24H0z' />
		<path d='M18 6 6 18M6 6l12 12' />
	</svg>
)
export default CloseIcon
