/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import ToastITem from './ToastITem'

const Toast = ({
	toastList = [],
	position = 'top-left',
	deleteToast,
	autoDelete = true,
	autoDeleteTime = 1000,
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

	const posClass = positionClasses[position] || positionClasses['top-left']

	return (
		<div className={`fixed z-50 ${posClass}`}>
			{list.map((toast) => (
				<ToastITem key={toast.id} toast={toast} deleteToast={deleteToast} />
			))}
		</div>
	)
}

export default Toast
