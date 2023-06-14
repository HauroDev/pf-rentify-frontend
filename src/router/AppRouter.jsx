import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import { routesName } from '../utils/routes_name'
import Card from '../components/Card'

const AppRouter = () => {
	return (
		<Routes>
			<Route path={routesName.home} element={<Home />} />
			<Route path='/card' element={<Card />} />
		</Routes>
	)
}

export default AppRouter
