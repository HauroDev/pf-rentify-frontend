import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidenav from './Sidenav'

const MainLayout = () => {
	return (
		<div className='flex max-w-[1920px] mx-auto'>
			<Sidenav />
			<div className=' md:ml-52 w-full relative'>
				<Header />
				<div className='min-h-[90vh] mt-[60px] py-8 px-4'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default MainLayout
