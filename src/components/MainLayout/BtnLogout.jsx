/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { LogoutUser } from '../../app/features/user/userSlice'
import LogoutIcon from '../icons/LogoutIcon'

const BtnLogout = ({ closeModal }) => {
	const dispatch = useDispatch()

	const handleClick = () => {
		closeModal(false)
		dispatch(LogoutUser())
	}

	return (
		<button
			className='flex items-center w-full px-4 py-2 hover:bg-dark_purple hover:text-white'
			onClick={handleClick}>
			<LogoutIcon
				className='stroke-medium_purple dark:stroke-light_purple cursor-pointer'
				width={24}
				height={24}
			/>
			<span className='ml-2'>Logout</span>
		</button>
	)
}

export default BtnLogout
