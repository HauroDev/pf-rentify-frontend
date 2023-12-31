import { useDispatch } from 'react-redux'
import { useContext, useEffect } from 'react'
import { LogoutUser, resetUser, setInitialUser } from './app/features/user/userSlice'
import { localStorageItems } from './utils/localStorageItems'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import { setCart } from './app/features/cart/cartSlice'
import { getCart } from './services/cartService'
import { ToastContext } from './context/ToastContext'
import jwt_decode from 'jwt-decode'
import AppRouter from './router/AppRouter'
import Toast from './components/Toast/Toast'
import { getGeolocation } from './utils/geolocationService'

function App() {
	const dispatch = useDispatch()
	const { toastList, deleteToast } = useContext(ToastContext)

	const userAuth = localStorage.getItem(localStorageItems.userAuth)
		? JSON.parse(localStorage.getItem(localStorageItems.userAuth))
		: { loggin: false, user: {} }


	useEffect(() => {
		getGeolocation()
		const cart = getCart()
		dispatch(setCart(cart))
		if (userAuth.login) {
			dispatch(setInitialUser({ idUser: userAuth.user.idUser, token: userAuth.token }))
		}
		const unsuscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				dispatch(resetUser())
			}
		})
		return () => unsuscribe()
	}, [])

	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen'>
			<AppRouter />
			{toastList.length > 0 && (
				<Toast
					toastList={toastList}
					deleteToast={deleteToast}
					position='top-center'
					autoDeleteTime={2000}
				/>
			)}
		</div>
	)
}

export default App
