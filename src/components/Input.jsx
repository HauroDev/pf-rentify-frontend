/* eslint-disable react/prop-types */
const Input = ({ type,name, value, onchange, placeholder = '', label = null }) => {
	return (
		<div className='w-full'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				type={type}
				name={name}
				id={name}
				value={value}
				placeholder={placeholder}
				className='w-full py-1 px-2 text-lg rounded-md border-[1px] border-gray_dark outline-none focus:outline-2 focus:outline-medium_fuchsia bg-white dark:bg-body_dark'
				onChange={onchange}
			/>
		</div>
	)
}

export default Input
