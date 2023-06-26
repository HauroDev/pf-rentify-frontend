/* eslint-disable react/prop-types */
import CloseIcon from '../icons/CloseIcon'

const ToastITem = ({ toast, deleteToast }) => {
	const colorsTypeClasses = {
		success: 'bg-success',
		danger: 'bg-danger',
		warning: 'bg-warning-hover ',
	}

	return (
		<div
			className={`scale-up-top relative w-96 p-4 rounded-lg  ${
				colorsTypeClasses[toast.type]
			} shadow-lg mb-4 `}>
			<button
				className='absolute right-5 py-0.5 hover:scale-105'
				onClick={() => deleteToast(toast.id)}>
				<CloseIcon className='stroke-white' />
			</button>
			<div className='truncate'>
				<h3 className='text-2xl bold mb-2 text-white'>{toast.title}</h3>
				<p className='text-base truncate text-white'>{toast.description}</p>
			</div>
		</div>
	)
}

export default ToastITem
