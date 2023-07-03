import { Navigate, Outlet } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import { useSelector } from 'react-redux'

import MainLayout from '../components/MainLayout/MainLayout'

const PrivateRoutes = () => {
	const userState = useSelector((state) => state.user)
	return (
		<MainLayout>{userState.login ? <Outlet /> : <Navigate to={routesName.login} />}</MainLayout>
	)
}

export default PrivateRoutes
