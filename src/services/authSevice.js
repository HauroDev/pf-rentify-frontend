import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
} from 'firebase/auth'
import { auth, providerGoogle } from '../firebase.config'
import axios from 'axios'
import { LOGIN_API, LOGOUT_API, USER_API } from '../utils/apiRoutes'
import { getTokenConfig } from './tokenConfig'

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
		uid: user.uid,
	}

	// aqui va la route y la logica del login del back
	const { data } = await axios.post(LOGIN_API, LogUser)
	return data
}

export const loginUser = async ({ email, password }) => {
	const { user } = await signInWithEmailAndPassword(auth, email, password)

	const LogUser = {
		email: user.email,
		uid: user.uid,
	}
	// aqui va la route y la logica del login del back
	const { data } = await axios.post(LOGIN_API, LogUser)

	return data
}

export const logoutUser = async () => {
	const config = getTokenConfig()
	await signOut(auth)
	const res = await axios.get(LOGOUT_API, config)
	return res
}

export const setInitialUserDB = async ({ idUser, token }) => {
	const config = getTokenConfig()
	const { data } = await axios.get(`${USER_API}/${idUser}`, config)
	return { user: data, token: token }
}

