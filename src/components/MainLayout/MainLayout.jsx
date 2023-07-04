/* eslint-disable react/prop-types */
// import { Outlet } from 'react-router-dom'
import { useModal } from '../../hooks/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser } from '../../app/features/user/userSlice'
import { useContext, useEffect } from 'react'
import { ToastContext } from '../../context/ToastContext'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Sidenav from './Sidenav'

const MainLayout = ({ children }) => {
	const [isOpen, openModal, closeModal] = useModal()

	const userState = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const { pathname } = useLocation()
	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		if (userState.status === 'success' && userState.user?.status === 'banned') {
			dispatch(LogoutUser())
			addToast({
				title: 'Warning',
				description: 'User banned',
				type: 'warning',
			})
		}
	}, [pathname])

	return (
		<div className='flex max-w-[1920px] mx-auto relative'>
			<Sidenav isOpen={isOpen} closeModal={closeModal} />
			<div className=' md:ml-52 w-full relative'>
				<Header openModal={openModal} />
				<div className='min-h-[90vh] mt-[60px] py-8 px-4'>{children}</div>
			</div>
		</div>
	)
}

export default MainLayout
