import { Routes, Route } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import MainLayout from '../components/MainLayout/MainLayout'
import Home from '../pages/Home'
import DetailProduct from '../pages/DetailProduct'
import SearchProducts from '../pages/SearchProducts'
import CreateProduct from '../pages/CreateProduct'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Profile from '../pages/Profile'

import CheckoutRouter from './CheckoutRouter'
import Checkout from '../pages/Checkout'
import PenddingCheckout from '../pages/checkout/PenddingCheckout'
import SuccessCheckout from '../pages/checkout/SuccessCheckout'
import ErrorCheckout from '../pages/checkout/ErrorCheckout'

const AppRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path={routesName.home} element={<Home />} />
				<Route path={routesName.detail_product} element={<DetailProduct />} />
				<Route path={routesName.search_products} element={<SearchProducts />} />
				<Route path={routesName.user['create-product']} element={<CreateProduct />} />
				<Route path={routesName.signup} element={<SignUp />} />
				<Route path={routesName.login} element={<Login />} />
				<Route path={routesName.profile} element={<Profile />} />

				<Route path={routesName.checkout.error} element={<ErrorCheckout />} />
				<Route path={routesName.checkout.pending} element={<PenddingCheckout />} />
				<Route path={routesName.checkout.successfull} element={<SuccessCheckout />} />
				<Route path={routesName.checkout.checkout} element={<Checkout />} />


			</Route>
		</Routes>
	)
}

export default AppRouter
