import { useModal } from '../../hooks/useModal'
import CustomSelect from './CustomSelect'

const SelectCountry = () => {
	const [isOpen, openModal, closeModal] = useModal()

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		closeModal()
	}

	return (
		<CustomSelect
			handleOpenClose={handleOpenModal}
			isOpen={isOpen}
			label='Country'
			positionLabel='left'
			messageSelect={'Select Country'}>
			<article
				className='hover:bg-dark_purple hover:text-white px-3 py-1 selection:bg-transparent'
				onClick={handleRestart}>
				Default
			</article>
		</CustomSelect>
	)
}

export default SelectCountry
