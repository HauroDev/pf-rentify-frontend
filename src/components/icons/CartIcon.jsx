const CartIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={28}
		height={28}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-shopping-cart'
		viewBox='0 0 24 24'
		{...props}>
		<path stroke='none' d='M0 0h24v24H0z' />
		<path d='M4 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0' />
		<path d='M17 17H6V3H4' />
		<path d='m6 5 14 1-1 7H6' />
	</svg>
)
export default CartIcon
