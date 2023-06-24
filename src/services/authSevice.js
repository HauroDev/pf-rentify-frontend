import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from 'firebase/auth'
import { auth, providerGoogle } from '../firebase.config'
import axios from 'axios'
import { USER_API } from '../utils/apiRoutes'

export const registerUser = async ({ email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)
	const newUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}

	const { data } = await axios.post(`${USER_API}`, newUser)

	return data
}

export const registerGoogle = async () => {
	const result = await signInWithPopup(auth, providerGoogle)
	const credential = GoogleAuthProvider.credentialFromResult(result)
	const token = credential.accessToken

	const user = result.user

	const newUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}

	const { data } = await axios.post(`${USER_API}`, newUser)

	return data
}

export const loginGoogle = async () => {
	const result = await signInWithPopup(auth, providerGoogle)
	const credential = GoogleAuthProvider.credentialFromResult(result)
	const token = credential.accessToken

	const user = result.user
	const LogUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}

	// aqui va la route y la logica del login del back

	return LogUser
}

export const loginUser = async ({ email, password }) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	const LogUser = {
		email: user.email,
		name: user.displayName || '',
		image: user.photoURL,
		phone: user.phoneNumber,
		uid: user.uid,
	}
	return LogUser
}

export const logoutUser = async () => {
	await signOut(auth)
	return null
}









// const userSnapshot = await getDoc(doc(db, 'users', user.uid));
// if (!userSnapshot.exists()) {
//   throw new Error('auth/user-not-found');
// }

// // Aquí va la lógica de inicio de sesión del backend

// return loggedInUser;
// } catch (error) {
// throw error;
// }
// };

// export const LoginUserGoogle = createAsyncThunk('user/LoginUserGoogle', async (user) => {
// try {
// return await loginGoogle(user);
// } catch (error) {
// console.log('Error during Google login:', error);
// throw error;
// }
// });