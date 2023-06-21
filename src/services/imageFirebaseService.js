import { getDownloadURL, ref, updateMetadata, uploadBytes } from 'firebase/storage'
import { storage, auth } from '../firebase.config'

export const saveAndGetImage = async (file, path) => {
	const metadata = {
		contentType: file.type,
		name: auth.currentUser.uid,
		size: file.size,
		customMetadata: {
			size: file.size,
			uidUser: auth.currentUser.uid,
		},
	}

	const filename = file.name.split('.')[0]

	const storageRef = ref(storage, `${path}/${auth.currentUser.uid}/${filename}`)
	await uploadBytes(storageRef, file)
	await updateMetadata(storageRef, metadata)
	let url = await getDownloadURL(storageRef)
	return url
}
