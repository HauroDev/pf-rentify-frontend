import MainLayout from '../components/MainLayout/MainLayout'
import { Outlet } from 'react-router-dom'

const AccesRoutes = () => {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}

export default AccesRoutes
