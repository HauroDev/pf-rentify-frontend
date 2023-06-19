/* eslint-disable react/prop-types */
const SelectCustomOption = ({ label, onclick }) => {
	return (
		<article
			title={label}
			className='hover:bg-dark_purple text-sm max-h-8 truncate capitalize hover:text-white px-3 py-1 selection:bg-transparent'
			onClick={onclick}>
			{label}
		</article>
	)
}

export default SelectCustomOption
