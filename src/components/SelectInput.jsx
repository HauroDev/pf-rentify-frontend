/* eslint-disable react/prop-types */
const SelectInput = ({ label, name }) => {
	return (
		<div className='flex flex-col gap-1'>
			<label htmlFor={name} className='font-cabin text-xs text-gray_dark'>
				{label}
			</label>
			<select
				name={name}
				id={name}
				className='font-cabin bg-white border-[1px] border-gray_dark py-1 px-4 rounded-md hover:cursor-pointer focus:border-dark_purple'>
				<option value=''>--Select--</option>
			</select>
		</div>
	)
}

export default SelectInput
