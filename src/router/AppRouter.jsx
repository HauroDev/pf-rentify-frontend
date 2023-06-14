import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { routesName } from '../utils/routes_name'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={routesName.home} element={<Home />} />
		</Routes>
	)
}

export default AppRouter
