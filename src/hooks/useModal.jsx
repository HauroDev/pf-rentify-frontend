import { useState } from 'react'

export const useModal = () => {
	const [isOpen, setIsOpen] = useState(false)

	const closeModal = () => {
		setIsOpen(false)
	}
	const openModal = () => {
		setIsOpen(true)
	}

	return [isOpen, openModal, closeModal]
}
