/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'

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

	const positionClasses = {
		'top-right': 't-4 r-4',
		'bottom-right': 'b-4 r-4',
		'top-left': 't-4 l-4',
		'bottom-left': 'b-4 l-4',
		'top-center': 't-4 l-1/2 -translate-x-1/2',
		'bottom-center': 'b-4 l-1/2 -translate-x-1/2',
	}

	const colorsTypeClasses = {
		success: 'bg-success shadow-success',
		error: 'bg-error shadow-error',
		warning: 'bg-warning shadow-warning',
	}

	return (
		<div className={`fixed z-10 ${positionClasses[position]}`}>
			{list.map((toast) => (
				<div
					key={toast.id}
					className={`scale-up-top relative w-80 p-4 rounded-lg ${
						colorsTypeClasses[toast.type]
					} shadow-lg mb-4 `}></div>
			))}
		</div>
	)
}

export default Toast
