import { Navigate, Outlet } from 'react-router-dom'
// import { localStorageItems } from '../utils/localStorageItems'
import { routesName } from '../utils/routes_name'
import MainLayout from '../components/MainLayout/MainLayout'
import { useSelector } from 'react-redux'

const PublicRoutes = () => {
	const userState = useSelector((state) => state.user)

	return <MainLayout>{userState.login ? <Navigate to={routesName.home} /> : <Outlet />}</MainLayout>
}

export default PublicRoutes
