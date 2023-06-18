import ArrowDown from '../icons/ArrowDown'
import ArrowUp from '../icons/ArrowUp'

/* eslint-disable react/prop-types */
const CustomSelect = ({
	label,
	positionLabel = 'right',
	messageSelect,
	isOpen,
	handleOpenClose,
	children,
}) => {
	const classOpen = isOpen ? 'border-dark_purple dark:border-light_purple' : 'border-gray_dark'

	const classPositionLabel =
		positionLabel === 'right'
			? 'text-right'
			: positionLabel === 'left'
			? 'text-left'
			: 'text-center'

	return (
		<div>
			{label && (
				<p className={`font-cabin text-xs text-gray_dark ${classPositionLabel} mb-1`}>{label}</p>
			)}

			<div
				className={`font-cabin trucate flex justify-between capitalize truncate bg-white dark:bg-card_dark border-[2px] ${classOpen} py-1 px-4 rounded-md hover:cursor-pointer selection:bg-transparent`}
				onClick={handleOpenClose}>
				<span className='truncate'>{messageSelect}</span>
				<span>
					{isOpen ? (
						<ArrowUp className='stroke-gray_dark w-6 h-6' />
					) : (
						<ArrowDown className='stroke-gray_dark w-6 h-6' />
					)}
				</span>
			</div>
			{isOpen && (
				<div
					className={`scale-up-top  mt-2 font-cabin bg-white border-[1px] ${classOpen} rounded-md hover:cursor-pointer dark:bg-card_dark`}>
					{children}
				</div>
			)}
		</div>
	)
}

export default CustomSelect
