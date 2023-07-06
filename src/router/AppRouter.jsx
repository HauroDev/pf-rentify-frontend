import { Routes, Route } from 'react-router-dom'
import { routesName } from '../utils/routes_name'
import Home from '../pages/Home'
import DetailProduct from '../pages/DetailProduct'
import SearchProducts from '../pages/SearchProducts'
import CreateProduct from '../pages/CreateProduct'
import SignUp from '../pages/SignUp'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Checkout from '../pages/Checkout'
import CheckoutResponse from '../pages/checkout/CheckoutResponse'
import Pricing from '../pages/Pricing'
import HowItWork from '../pages/HowItWork'
import FAQS from '../pages/FAQS'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AccesRoutes from './AccesRoutes'
import Page404 from '../pages/Page404'
import AboutUs from '../pages/AboutUs'

const AppRouter = () => {
	return (
		<Routes>
			<Route to='/' element={<PublicRoutes />}>
				<Route path={routesName.signup} element={<SignUp />} />
				<Route path={routesName.login} element={<Login />} />
			</Route>

			<Route to='/' element={<PrivateRoutes />}>
				<Route path={routesName.user['create-product']} element={<CreateProduct />} />
				<Route path={routesName.user['profile']} element={<Profile />} />
				<Route path={routesName.checkout.checkout} element={<Checkout />} />
				
			</Route>

			<Route to='/' element={<AccesRoutes />}>
				<Route path={routesName.home} element={<Home />} />
				<Route path={routesName.detail_product} element={<DetailProduct />} />
				<Route path={routesName.search_products} element={<SearchProducts />} />
				<Route path={routesName.checkout.error} element={<CheckoutResponse />} />
				<Route path={routesName.checkout.pending} element={<CheckoutResponse />} />
				<Route path={routesName.checkout.successfull} element={<CheckoutResponse />} />
				<Route path={routesName.pricing} element={<Pricing />} />
				<Route path={routesName['how-it-works']} element={<HowItWork />} />
				<Route path={routesName.faqs} element={<FAQS />} />
				<Route path={routesName['about-Us']} element={<AboutUs />} />
			</Route>

			<Route path='*' element={<Page404 />} />
		</Routes>
	)
}

export default AppRouter
