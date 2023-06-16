import { Routes, Route } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import MainLayout from '../components/MainLayout/MainLayout'
import Home from '../pages/Home'
import DetailProduct from '../pages/DetailProduct'
import SearchProducts from '../pages/SearchProducts'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path={routesName.home} element={<Home />} />
				<Route path={routesName.detail_product} element={<DetailProduct />} />
				<Route path={`${routesName.search_products}`} element={<SearchProducts />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
