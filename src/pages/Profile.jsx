import { useSelector } from 'react-redux'
import UserProfile from '../components/Profile/Profile'
import Loader from '../components/Loader'

const initalStateProduct = {
	product: {},
	status: 'idle',
	error: null,
}
const Profile = () => {
	const state = useSelector((state) => state.user)
	const user = state.user

	if (state.status === 'loading') return <Loader />

	if (state.status === 'error') return <h3>Error: {state.error}</h3>

	return (
		<>
			<UserProfile
				idUser={user.idUser}
				image={user.image}
				//name={user.name}
				phone={user.phone}
				email={user.email}
				membership={user.membership}
			/>
		</>
	)
}

export default Profile
