// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyCu7LkSZDyrDg0MiDQ2nQHKadrETBOG6U8',
	authDomain: 'rent-ify.firebaseapp.com',
	projectId: 'rent-ify',
	storageBucket: 'rent-ify.appspot.com',
	messagingSenderId: '232023871468',
	appId: '1:232023871468:web:20d76f2a6166f810ffbac9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const providerGoogle = new GoogleAuthProvider(app)
export const storage = getStorage(app)
