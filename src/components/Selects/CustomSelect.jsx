/* eslint-disable react/prop-types */
const CustomSelect = ({ label, messageSelect, isOpen, handleOpenClose, children }) => {
	const classOpen = isOpen ? 'border-dark_purple dark:border-light_purple' : 'border-gray_dark'

	return (
		<div>
			{label && <p className='font-cabin text-xs text-gray_dark text-right mb-1'>{label}</p>}

			<div
				className={`font-cabin bg-white dark:bg-body_dark border-[2px] ${classOpen} py-1 px-4 rounded-md hover:cursor-pointer selection:bg-transparent`}
				onClick={handleOpenClose}>
				{messageSelect}
			</div>
			{isOpen && (
				<div
					className={`scale-up-top  mt-2 font-cabin bg-white border-[1px] ${classOpen} rounded-md hover:cursor-pointer dark:bg-body_dark`}>
					{children}
				</div>
			)}
		</div>
	)
}

export default CustomSelect
