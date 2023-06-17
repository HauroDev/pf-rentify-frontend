/* eslint-disable react/prop-types */
const CustomSelect = ({ label, messageSelect, isOpen, handleOpenClose, children }) => {
	return (
		<>
			<div>
				<span className='font-cabin text-xs text-gray_dark'>{label}</span>

				<div
					className='font-cabin bg-white dark:bg-body_dark border-[1px] border-gray_dark py-1 px-4 rounded-md hover:cursor-pointer focus:border-dark_purple'
					onClick={handleOpenClose}>
					{messageSelect}
				</div>
				{isOpen && (
					<div className='scale-up-top  mt-2 font-cabin bg-white border-[1px] border-gray_dark rounded-md hover:cursor-pointer focus:border-dark_purple dark:bg-body_dark'>
						{children}
					</div>
				)}
			</div>
		</>
	)
}

export default CustomSelect
