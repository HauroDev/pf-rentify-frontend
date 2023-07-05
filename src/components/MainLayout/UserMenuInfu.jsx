import { Link } from 'react-router-dom'
import { useState,useEffect } from "react"
import imgNotFound from '../../assets/image/image-not-found.jpg'
import { routesName } from '../../utils/routes_name'
import { isImgValid } from '../../utils/isImgValid'
import BtnLogout from './BtnLogout'
const LoggedInMenu = ({user, refMenu, login, setMenuOpen}) => {
    const [userNameShow, setUserNameShow] = useState("")
    const [imgExist, setImgExist] = useState(false)
    useEffect(() => {
        setUserNameShow(user?.name || user?.email || '')
    }, [user?.name, user?.email])

    useEffect(() => {
		if (login === true) {
			isImgValid(user?.image, setImgExist)
		}
	}, [login])
    return (
        <div
            ref={refMenu}
            className='absolute top-10 right-0 bg-white dark:bg-card_dark shadow-md w-52 mt-2 rounded-md'
            onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center pt-2 pb-1 gap-2 px-4 py-1 truncate'>
                <img
                    src={imgExist ? user.image : imgNotFound}
                    alt='User'
                    className='w-8 h-8 rounded-full'
                />

                <span className='text-sm truncate'>{userNameShow}</span>
            </div>
            <div className='my-2 border-b'></div>
            <section className='w-full flex flex-col'>
                <Link to={routesName.user.profile} className='text-left cursor-pointer w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
                    Profile
                </Link>
                <Link
                    to={routesName.user['create-product']}
                    className='text-left cursor-pointer w-full px-4 py-2 hover:bg-dark_purple hover:text-white'>
                    Create a Service
                </Link>
            </section>
            <div className='my-2 border-b'></div>

            <BtnLogout closeModal={setMenuOpen} />
        </div>
    )
}

export default LoggedInMenu 