import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidenav from './Sidenav'
import { useModal } from '../../hooks/useModal'

const MainLayout = () => {
	const [isOpen, openModal, closeModal] = useModal()

	return (
		<div className='flex max-w-[1920px] mx-auto relative'>
			<Sidenav isOpen={isOpen} closeModal={closeModal} />
			<div className=' md:ml-52 w-full relative'>
				<Header openModal={openModal} />
				<div className='min-h-[90vh] mt-[60px] py-8 px-4'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MainLayout
