/* eslint-disable react/prop-types */
const ModalContainer = ({ children }) => {
	return (
		<div className='fixed top-0 left-0 w-full min-h-screen p-4 py-8 bg-modal_bg_50  backdrop-blur'>
			{children}
		</div>
	)
}

export default ModalContainer
