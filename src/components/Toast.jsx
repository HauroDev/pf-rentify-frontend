/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import CloseIcon from './icons/CloseIcon'

const Toast = ({
	toastList = [],
	position = 'top-left',
	deleteToast,
	autoDelete = true,
	autoDeleteTime = 5000,
}) => {
	const [list, setList] = useState(toastList)

	useEffect(() => {
		setList(toastList)
	}, [toastList])

	useEffect(() => {
		const interval = setInterval(() => {
			if (autoDelete && toastList.length && list.length) {
				deleteToast(toastList[0].id)
			}
		}, autoDeleteTime)

		return () => {
			clearInterval(interval)
		}
	}, [toastList])

	const positionClasses = {
		'top-right': 'top-4 right-4',
		'bottom-right': 'bottom-4 right-4',
		'top-left': 'top-4 left-4',
		'bottom-left': 'bottom-4 left-4',
		'top-center': 'top-4 left-1/2 -translate-x-1/2',
		'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
	}

	const colorsTypeClasses = {
		success: 'bg-success',
		danger: 'bg-danger',
		warning: 'bg-warning-hover ',
	}
	const posClass = positionClasses[position] || positionClasses['top-left']

	return (
		<div className={`fixed z-50 ${posClass}`}>
			{list.map((toast) => (
				<div
					key={toast.id}
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
			))}
		</div>
	)
}

export default Toast
