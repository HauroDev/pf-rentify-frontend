import { Routes, Route } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import MainLayout from '../components/MainLayout/MainLayout'
import Home from '../pages/Home'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path={routesName.home} element={<Home />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
