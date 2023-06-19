import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth, providerGoogle } from '../firebase.config'
import axios from 'axios'
import { USER_API } from '../utils/apiRoutes'

export const registerUser = async ({ email, password }) => {
	const { user } = await createUserWithEmailAndPassword(auth, email, password)
	const newUser = {
		email: user.email,
		name: user.displayName,
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
	console.log(token)
	const user = result.user

	const newUser = {
		email: user.email,
		name: user.displayName,
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
	console.log(token)
	const user = result.user

	return user
}
