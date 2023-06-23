/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
	const [toastList, setToastList] = useState([])

	const addToast = ({ title = '', description = '', type = '' }) => {
		let id = crypto.randomUUID()
		if (toastList.length >= 3) {
			const newList = [...toastList]
			newList.shift()
			setToastList([...newList, { id, title, description, type }])
		} else {
			setToastList([...toastList, { id, title, description, type }])
		}
	}

	const deleteToast = (id) => {
		const filter = toastList.filter((toast) => toast.id !== id)
		setToastList([...filter])
	}

	const data = { toastList, addToast, deleteToast }

	return <ToastContext.Provider value={data}>{children}</ToastContext.Provider>
}
