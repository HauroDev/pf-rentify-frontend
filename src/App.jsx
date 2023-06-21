import { useDispatch } from 'react-redux'
import AppRouter from './router/AppRouter'
import { useEffect } from 'react'
import { setUser } from './app/features/user/userSlice'

function App() {
	const dispatch= useDispatch()
	// const state=useSelector(state=>state.user);
	const userAuth=localStorage.getItem('userAuth')?JSON.parse(localStorage.getItem('userAuth')):null
	useEffect(()=>{
		console.log(userAuth);
		 if(userAuth){
			dispatch(setUser(userAuth))
		 }
	},[])
	return (
		<div className='bg-body_light text-text_light dark:bg-body_dark dark:text-text_dark min-h-screen'>
			<AppRouter />
		</div>
	)
}

export default App
