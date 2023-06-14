import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidenav from './Sidenav'
import Card from '../Card';

const MainLayout = () => {
	return (
		<div className='flex max-w-[1920px] mx-auto'>
			<Sidenav />
			<div className='w-4/5 lg:w-10/12'>
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
