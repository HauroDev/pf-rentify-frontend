import social from '../assets/image/social-commerce-image.png';
import shippingCajita from '../assets/image/shipping-2.png'
// import diamond from '../assets/image/diamond.jpg'
import userIcon from '../assets/image/user-icon.png';
import handDiamond from '../assets/image/hand-diamond.png';
import securePayment from '../assets/image/secure-payment.png';
import membershipIcon from '../assets/image/membership-icon.png'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { membershipService } from '../services/membershipService';

import { initMercadoPago } from '@mercadopago/sdk-react';
import { MERCADOPAGO_PUBLIC_KEY } from '../mercadopacgo.config';
import { Wallet } from '@mercadopago/sdk-react';

import Loader from '../components/Loader';
import { useNavigate } from 'react-router';


initMercadoPago(MERCADOPAGO_PUBLIC_KEY);

const Pricing = () => {
	const { user } = useSelector(state => state.user);
	const navigate = useNavigate();
	const [isReady, setIsReady] = useState(false);
	const [mPUrl, setMPUrl] = useState(null);
	const [loading, setIsLoading] = useState(false);
	const [idUser, setIdUser] = useState("");

	console.log(user);

	const handleOnReady = () => {
		setIsReady(true)
	}

	// const renderCheckoutButton = (url) => {
	// 	if (!url) return null
	// 	console.log(url);
	// 	return (
	// 		<Wallet
	// 			initialization={{ preferenceId: url, redirectMode: 'self' }}
	// 			onReady={handleOnReady}
	// 		/>
	// 	)
	// }
	useEffect(() => {
		if (user) {
			setIdUser(user.idUser)
		}
	}, [user])

	const handleClick = async (e) => {
		setIsLoading(true)
		const email = user.email;
		const type = e.target.value;
		const backURL = "https://pf-rentify-frontend.vercel.app";
		const price = e.target.value === "premium" ? 869.99 : 569.99;

		const paymentInfo = {
			reason: `Suscripción mensual`,
			price: price,
			type: type,
			idUser: idUser
		}

		console.log(paymentInfo)
		console.log(type);
		try {
			const data = await membershipService(paymentInfo);
			console.log(data);
			setMPUrl(data.url)
			if (data.url) {
				window.location.href = data.url;
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}

	}

	return (
		<div className='max-w-6xl mx-auto p-8'>
			<div className='flex flex-col items-center'>
				<div className='flex flex-col md:flex-row items-center justify-center w-full '>
					<div className="h-60 md:w-1/2 bg-gray_light dark:bg-card_dark p-4 flex items-center justify-center">
						<div className='text-center'>
							<h2 className='text-5xl md:text-6xl font-bold text-medium_purple mb-4'>Rent-ify Membership</h2>
							<p className='text-xl leading-7 text-text_light dark:text-text_dark mt-8'>Exclusive access and special benefits</p>
						</div>
					</div>
					<img src={social} alt="social" className='h-60 md:w-1/2 object-cover' />
				</div>

				<div className="text-center mt-8">
					<h3 className="text-2xl font-bold text-medium_purple">Unlock a world of convenience and savings with our exclusive membership program</h3>
					<div className="flex flex-col md:flex-row justify-center mt-8 space-y-1 md:space-y-0 ">
						<div className="text-justify flex flex-col items-center p-4 md:w-1/4 bg-gray_light dark:bg-card_dark">
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Gain unlimited access to a wide range of items, enjoy discounted transaction fees, and receive top-notch support.</p>
						</div>
						<img src={shippingCajita} alt="shipping-cajita" className="h-auto w-full md:w-1/5 max-h-48" />
						<div className="text-justify flex flex-col items-center p-4 md:w-1/4 bg-gray_light dark:bg-card_dark">
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Whether you're a frequent renter or a savvy item owner, our membership offers a host of benefits tailored to enhance your renting experience.</p>
						</div>
					</div>
				</div>



				<div className="text-center mt-8">
					<h3 className='text-4xl font-bold text-medium_purple'>Membership Plans</h3>
				</div>

				<div className="flex flex-col md:flex-row justify-center mt-8 space-y-9 md:space-y-0 md:space-x-4">
					<div className="w-full md:w-1/3 bg-gray_light dark:bg-card_dark p-8 flex flex-col items-center ">
						<p className="text-medium_purple font-bold leading-6 text-xl">Basic Membership (Free)</p>
						<ul className="text-text_light dark:text-text_dark mt-4 text-lg">
							<li>Up to 5 items listings per month.</li>
							<li>Standard transaction fees.</li>
							<li>Enjoy Rent-ify for free.</li>
						</ul>
						{user.membership === 'basic' ? (
							<p className="text-medium_purple">Current</p>
						) : (
							<button
								className="bg-medium_purple text-white font-bold py-2 px-4 mt-4 rounded"
								value="basic"
								onClick={handleClick}
							>
								Upgrade
							</button>
						)}
					</div>

					<div className="w-full md:w-1/3 bg-gray_light dark:bg-card_dark p-8 flex flex-col items-center justify-between">
						<p className="text-medium_purple font-bold leading-6 text-xl">Standard Membership</p>
						<ul className="text-text_light dark:text-text_dark mt-4 text-lg">
							<li>Up to 5 items listings per month.</li>
							<li>Standard transaction fees.</li>
							<li>Price: $569.99 per month</li>
						</ul>
						{user.membership === 'standard' ? (
							<p className="text-medium_purple">Current</p>
						) : (
							<button
								className="bg-medium_purple text-white font-bold py-2 px-4 mt-4 rounded"
								value="standard"
								onClick={handleClick}
							>
								Upgrade
							</button>
						)}
					</div>

					<div className="w-full md:w-1/3 bg-gray_light dark:bg-card_dark p-8 flex flex-col items-center justify-between">
						<p className="text-medium_purple font-bold leading-6 text-xl">Premium Membership 💎</p>
						<ul className="text-text_light dark:text-text_dark mt-4 text-lg">
							<li>Unlimited items listings per month.</li>
							<li>No transaction fees.</li>
							<li>Price: $999.99 per month</li>
						</ul>
						{user.membership === 'premium' ? (
							<p className="text-medium_purple">Current</p>
						) : (
							<button
								className="bg-medium_purple text-white font-bold py-2 px-4 mt-4 rounded"
								value="premium"
								onClick={handleClick}
							>
								Upgrade
							</button>
						)}

					</div>

				</div>


				<div className='text-center mt-8'>
					<div className='text-center'>
						<p className='text-text_gray font-bold text-md'>How to</p>
						<h3 className='text-4xl font-bold text-medium_purple'>Subscribe to Membership</h3>
					</div>
					<div className="flex flex-col md:flex-row justify-center mt-8 space-y-8 md:space-y-0 md:space-x-12">
						<div className='text-justify flex flex-col items-center justify-between'>
							<p className="text-2xl font-bold text-medium_purple">1</p>
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Sign up or log in to your Rent-ify account.</p>
							<img src={userIcon} alt="user-icon" className="h-20 w-20 my-4 " />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p className="text-2xl font-bold text-medium_purple">2</p>
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Select the desired plan (Premium or Standard).</p>
							<img src={handDiamond} alt="hand-diamond" className="my-4 h-20 w-20" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p className="text-2xl font-bold text-medium_purple">3</p>
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Complete the secure payment process (if applicable).</p>
							<img src={securePayment} alt="secure-payment" className="my-4 h-20 w-20" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p className="text-2xl font-bold text-medium_purple">4</p>
							<p className="text-lg leading-6 text-text_light dark:text-text_dark">Confirm your membership and gain access to benefits.</p>
							<img src={membershipIcon} alt="membership-icon" className="my-4 h-20 w-20" />
						</div>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</div>
	)
}

export default Pricing
