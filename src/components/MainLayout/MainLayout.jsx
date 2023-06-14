import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidenav from './Sidenav'
import Card from '../Card';

const MainLayout = () => {
	return (
		<div className='flex max-w-[1920px] mx-auto'>
			<Sidenav />
			<div className=' md:ml-[300px] w-full'>
				<Header />
				<div className='min-h-[90vh] py-8 px-4'>
				<Outlet>
					<Card />
                </Outlet>
				</div>
			</div>
		</div>
	)
}

export default MainLayout
