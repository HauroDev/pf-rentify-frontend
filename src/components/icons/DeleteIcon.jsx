function DeleteIcon(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={28}
			height={28}
			fill='none'
			stroke='#2c3e50'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={1.5}
			className='icon icon-tabler icon-tabler-trash'
			viewBox='0 0 24 24'
			{...props}>
			<path stroke='none' d='M0 0h24v24H0z' />
			<path d='M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3' />
		</svg>
	)
}

export default DeleteIcon
