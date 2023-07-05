import social from '../assets/image/social-commerce-image.png'
import shippingCajita from '../assets/image/shipping-2.png'
// import diamond from '../assets/image/diamond.jpg'
import userIcon from '../assets/image/user-icon.png'
import handDiamond from '../assets/image/hand-diamond.png'
import securePayment from '../assets/image/secure-payment.png'
import membershipIcon from '../assets/image/membership-icon.png'

import { useEffect, useState, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { membershipService, cancelMembershipService } from '../services/membershipService'

import { initMercadoPago } from '@mercadopago/sdk-react'
import { MERCADOPAGO_PUBLIC_KEY } from '../mercadopacgo.config'
import { Wallet } from '@mercadopago/sdk-react'

import Loader from '../components/Loader'
import { useNavigate } from 'react-router';

import { routesName } from '../utils/routes_name';
import { ToastContext } from '../context/ToastContext'

import { setUser } from '../app/features/user/userSlice'

initMercadoPago(MERCADOPAGO_PUBLIC_KEY)

const Pricing = () => {
	const { user } = useSelector((state) => state.user)
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isReady, setIsReady] = useState(false)
	const [mPUrl, setMPUrl] = useState(null)
	const [loading, setIsLoading] = useState(false)
	const [idUser, setIdUser] = useState('');
	const { addToast } = useContext(ToastContext)

	console.log(user)

	const handleOnReady = () => {
		setIsReady(true)
	}

	useEffect(() => {
		if (user) {
			setIdUser(user.idUser)
		}
	}, [user])

	const handleClick = async (e) => {
		setIsLoading(true)
		const email = user.email;
		const type = e.target.value;
		
		const price = e.target.value === "premium" ? 869.99 : 569.99;

		const paymentInfo = {
			reason: `Suscripción mensual`,
			price: price,
			type: type,
			idUser: idUser,
		}

		console.log(paymentInfo)
		console.log(type)
		try {
			const data = await membershipService(paymentInfo)
			console.log(data)
			setMPUrl(data.url)
			if (data.url) {
				window.location.href = data.url
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
	}

	const handleCancelClick = async () => {
		setIsLoading(true)
		try {
			const data = await cancelMembershipService(idUser);
			console.log(data);
			if(!data.message){
				throw Error("Api error")
			}else{
				addToast({
					title: 'Success',
					description: `Subscription canceled successfully`,
					type: 'success',
				})
				setTimeout(() => {
            
					window.location.reload();
				}, 100);
			}
		} catch (error) {
			addToast({
				title: `${error.message}`,
				description: `The subscription could not be canceled`,
				type: 'danger',
			})
		} finally {
			setIsLoading(false)
		}
	}


	const handleRegister = () =>{
		navigate(routesName.signup)
	}



	return (
		<div className='min-w-[350px] mx-auto '>
			<div className='flex flex-col items-center'>
				<section className='flex flex-col md:flex-row items-center justify-center w-full '>
					<article className='md:h-60 w-full lg:w-1/2 bg-gray_light dark:bg-card_dark p-4 flex items-center justify-center order-2 lg:order-1'>
						<div className='text-center'>
							<h2 className='text-3xl md:text-5xl xl:text-6xl font-bold text-medium_purple mb-4'>
								Rent-ify Membership
							</h2>
							<p className='text-base lg:text-lg leading-7 text-text_light dark:text-text_dark mt-8'>
								Exclusive access and special benefits
							</p>
						</div>
					</article>
					<article className='h-60 w-full lg:w-1/2 order-1 lg:order-2'>
						<img src={social} alt='social' className='h-full w-full object-cover' />
					</article>
				</section>

				<section
					className='relative text-center mt-8 bg-center bg-fixed bg-cover p-8 w-full min-h-[300px]'
					style={{ backgroundImage: `url(${shippingCajita})` }}>
					<div className='absolute z-0 top-0 left-0 min-h-full w-full bg-modal_bg_50 backdrop-blur-sm'></div>
					<div className='relative z-[1]'>
						<h3 className='text-2xl font-bold text-white'>
							Unlock a world of convenience and savings with our exclusive membership program
						</h3>

						<div className='flex flex-col lg:flex-row justify-between items-center gap-8 mt-8 space-y-1 md:space-y-0'>
							<div className='text-justify flex flex-col items-center lg:w-[300px] p-4'>
								<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
									Gain unlimited access to a wide range of items, enjoy discounted transaction fees,
									and receive top-notch support.
								</p>
							</div>

							<div className='text-justify flex flex-col items-center lg:w-[300px] p-4'>
								<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
									Whether you're a frequent renter or a savvy item owner, our membership offers a
									host of benefits tailored to enhance your renting experience.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className='my-16 w-full'>
					<article className='text-center mb-8'>
						<h3 className='text-4xl font-bold text-medium_purple'>Membership Plans</h3>
					</article>

					<article className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-5 w-full'>
						<div className='w-9/12 lg:w-[300px] h-80 bg-gray_light dark:bg-card_dark p-8 flex flex-col justify-between'>
							<p className='text-medium_purple font-bold leading-6 text-xl'>
								Basic Membership (Free)
							</p>
							<ul className='text-text_light dark:text-text_dark mt-6 text-md'>
								<li>Up to 5 items listings per month.</li>
								<li>Standard transaction fees.</li>
								<li>Enjoy Rent-ify for free.</li>
							</ul>
							{Object.keys(user).length
							?
							user.membership === 'basic' ? (
								<p className='text-green_medium font-bold leading-6 text-xl text-center mt-8'>
									Current plan
								</p>
							) : (
								<button
									className='bg-medium_purple text-white leading-6 text-lg py-2 px-4 mt-8 rounded'
									value='basic'
									onClick={handleCancelClick}>
									Downgrade
								</button>
							):<button
								className='bg-medium_purple text-white leading-6 text-lg py-2 px-4 mt-8 rounded'
								value='basic'
								onClick={handleRegister}>
								Register
						</button>}
						</div>

						<div className=' w-9/12 lg:w-[300px] h-80 bg-gray_light dark:bg-card_dark p-8 flex flex-col justify-between'>
							<p className='text-medium_purple font-bold leading-6 text-xl'>Standard Membership</p>
							<ul className='text-text_light dark:text-text_dark mt-6 text-md'>
								<li>Up to 5 items listings per month.</li>
								<li>Standard transaction fees.</li>
								<li className='text-medium_purple'>Price: $569.99 per month</li>
							</ul>
							{Object.keys(user).length
							?user.membership === 'premium' || user.membership === 'basic' ? (
								<button
									className='bg-medium_purple text-white font-bold py-2 px-4 mt-4 text-lg rounded'
									value='standard'
									onClick={handleClick}>
									{user.membership === 'premium' ? 'Downgrade' : ''}
									{user.membership === 'basic' ? 'Upgrade' : ''}
								</button>
							) : (
								<p className='text-green_medium font-bold leading-6 text-xl text-center mt-8'>
									Current plan
								</p>
							)
							:<div></div>}
						</div>

						<div className='w-9/12 lg:w-[300px] h-80 bg-gray_light dark:bg-card_dark p-8 flex flex-col justify-between'>
							<p className='text-medium_purple font-bold leading-6 text-xl'>
								Premium Membership 💎
							</p>
							<ul className='text-text_light dark:text-text_dark mt-6 text-md'>
								<li>Unlimited items listings per month.</li>
								<li>No transaction fees.</li>
								<li className='text-medium_purple'>Price: $999.99 per month</li>
							</ul>
							{Object.keys(user).length
							?user.membership === 'premium' ? (
								<p className='text-green_medium font-bold leading-6 text-xl text-center mt-8'>
									Current plan
								</p>
							) : (
								<button
									className='bg-medium_purple text-white leading-6 text-lg py-2 px-4 mt-8 rounded'
									value='premium'
									onClick={handleClick}>
									Upgrade
								</button>
							)
							:<div></div>}
						</div>
					</article>
				</section>

				<section className='text-center mt-8'>
					<div className='text-center'>
						<p className='text-text_gray font-bold text-md'>How to</p>
						<h3 className='text-4xl font-bold text-medium_purple'>Subscribe to Membership</h3>
					</div>

					<div className='grid grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 xl:grid-rows-1 xl:grid-cols-4 gap-8 justify-center mt-8'>
						<article className='text-justify flex flex-col items-center justify-between'>
							<p className='text-2xl font-bold text-medium_purple'>1</p>
							<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
								Sign up or log in to your Rent-ify account.
							</p>
							<img src={userIcon} alt='user-icon' className='h-20 w-20 my-4 ' />
						</article>

						<article className='text-justify flex flex-col items-center justify-between'>
							<p className='text-2xl font-bold text-medium_purple'>2</p>
							<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
								Select the desired plan (Premium or Standard).
							</p>
							<img src={handDiamond} alt='hand-diamond' className='my-4 h-20 w-20' />
						</article>

						<article className='text-justify flex flex-col items-center justify-between'>
							<p className='text-2xl font-bold text-medium_purple'>3</p>
							<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
								Complete the secure payment process (if applicable).
							</p>
							<img src={securePayment} alt='secure-payment' className='my-4 h-20 w-20' />
						</article>

						<article className='text-justify flex flex-col items-center justify-between'>
							<p className='text-2xl font-bold text-medium_purple'>4</p>
							<p className='text-lg leading-6 text-text_light dark:text-text_dark'>
								Confirm your membership and gain access to benefits.
							</p>
							<img src={membershipIcon} alt='membership-icon' className='my-4 h-20 w-20' />
						</article>
					</div>
				</section>
			</div>
			{loading && <Loader />}
		</div>
	)
}

export default Pricing
