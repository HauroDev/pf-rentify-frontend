import { useDispatch } from 'react-redux'
import { useContext, useEffect } from 'react'
import { LogoutUser, resetUser, setUser } from './app/features/user/userSlice'
import { localStorageItems } from './utils/localStorageItems'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.config'
import { setCart } from './app/features/cart/cartSlice'
import { getCart } from './services/cartService'
import { ToastContext } from './context/ToastContext'
import jwt_decode from 'jwt-decode'
import AppRouter from './router/AppRouter'
import Toast from './components/Toast/Toast'

function App() {
	const dispatch = useDispatch()
	const { toastList, deleteToast } = useContext(ToastContext)

	const userAuth = localStorage.getItem(localStorageItems.userAuth)
		? JSON.parse(localStorage.getItem(localStorageItems.userAuth))
		: { loggin: false, user: {} }

	useEffect(() => {
		const cart = getCart()
		dispatch(setCart(cart))
		if (userAuth.login) {
			dispatch(setUser(userAuth.user))
		}
		const unsuscribe = onAuthStateChanged(auth, (user) => {
			if (!user) {
				localStorage.removeItem(localStorageItems.userAuth)
				dispatch(resetUser())
			}
		})
		return () => unsuscribe()
	}, [])

	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen'>
			<AppRouter />
			{toastList.length > 0 && (
				<Toast toastList={toastList} deleteToast={deleteToast} position='top-center' />
			)}
		</div>
	)
}

export default App
