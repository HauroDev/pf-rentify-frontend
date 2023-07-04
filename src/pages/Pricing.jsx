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
	const {user} = useSelector(state=>state.user);
	const navigate = useNavigate();
	const [isReady, setIsReady] = useState(false);
	const [mPUrl, setMPUrl] = useState(null);
	const [loading, setIsLoading] = useState(false);
	const [idUser,setIdUser] = useState("");

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
	useEffect(()=>{
		if(user){
			setIdUser(user.idUser)
		}
	},[user])

	const handleClick = async (e) => {
		setIsLoading(true)
		const email = user.email;
		const type = e.target.value;
		const backURL = "https://pf-rentify-frontend.vercel.app";
		const price =  e.target.value === "premium" ? 869.99:569.99;
		
		const paymentInfo = {
			reason: `Suscripción mensual`,
			price: price,
			type:type,
			idUser: idUser
		}
		
		console.log(paymentInfo)
		console.log(type);
		try {
			const data = await membershipService(paymentInfo);
			console.log(data);
			setMPUrl(data.url)
			if(data.url){
				window.location.href = data.url;
			}
		} catch (error) {
			console.log(error)
		} finally {
			setIsLoading(false)
		}
		
	}

	return (
		<div className='container mx-auto p-4'>
			<div className='flex flex-col items-center'>
				<div className='flex items-center  justify-center w-full '>
					<div className="h-48 w-1/2 bg-gray_medium p-4 flex items-center justify-center">
						<div className='h-4/5  flex flex-col justify-around items-center'>
							<h2 className='text-4xl font-bold'>Rent-ify Membership</h2>
							<h3 className='text-2xl font-bold'>Exclusive acces and special benefits</h3>
						</div>
					</div>
					<img src={social} alt="social" className='h-48'/>
				</div>

				<div className=''>
					<h3 className='text-2xl font-bold text-center'>Unlock a world of convenience and savings with our exclusive membership program</h3>
					<div className='flex items-center  justify-center '>
						<div className='h-48 w-1/5 bg-gray_red p-4 flex items-center'>
							<p className='text-base text-justify font-bold'>Gain unlimited access to a wide range of items, enjoy discounted transaction fees, and receive top-notch support.</p>
						</div>
						<img src={shippingCajita} alt="shipping-cajita" className='h-48'/>
						<div className='h-48 w-1/5 bg-gray_red p-4 flex items-center'>
							<p className='text-base text-justify font-bold'>Whether you're a frequent renter or a savvy item owner, our membership offers a host of benefits tailored to enhance your renting experience.</p>
						</div>
					</div>
				</div>

				<div className='flex flex-col items-center'>
					<div><h3 className='text-2xl'>Membership Plans</h3></div>
					<div className="flex justify-center mt-8 space-x-8">
						<div className='bg-gray_red p-5'>
							<p className='font-bold text-lg '>Basic Membership (Free)</p>
							<p>{user.membership === "basic" ? "Current":""}</p>
							<ul className='font-bold'>
								<li>Up to 5 items listings per month.</li>
								<li>Standard transaction fees.</li>
								<li>Enjoy Rent-ify for free.</li>
							</ul>
						</div>

						<div className='bg-gray_red p-5'>
							<p className='font-bold text-lg '>Standard Membership</p>
							<ul className='font-bold'>
								<li>Up to 5 items listings per month.</li>
								<li>Standard transaction fees.</li>
								
								<li>Price: $569.99 per month</li>
							</ul>
							{
								user.membership === "premium" || user.membership === "basic"
								? 
								(<button 
									onClick={handleClick} 
									className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md '
									value="standard">
									Subscribe	
									</button>)
								: null

							}
							
						</div>

						<div className='bg-gray_red p-5'>
							<p className='font-bold text-lg'>Premium Membership</p>
							<ul className='font-bold'>
								<li>Unlimited number of item listings per month.</li>
								<li>Reduced transaction fees</li>
								<li>Priority highlighting in search results</li>
								<li><span>💎</span>Premium customer support</li>
								<li>Price: $869.99 per month</li>
							</ul>
							{
								user.membership === "standard" || user.membership === "basic"
								? 
								(<button 
									onClick={handleClick} 
									className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md '
									value="premium">
									Subscribe
									</button>)
								: null

							}
							{/* {renderCheckoutButton(mPUrl)} */}
						</div>
					</div>
					<div><h3>Choose the membership plan that suits your needs and start enjoying the benefits of Rent-ify today!</h3></div>
				</div>

				<div className='w-3-4'>
					<div className='text-center'>
						<p className='text-gray_medium text-sm'>How to</p>
						<h3 className='text-4xl'>Subscribe to MemberShip</h3>
					</div>
					<div className="flex justify-center mt-8 space-x-8">
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>1</p>
							<p>Sign up or log in to your Rent-ify account.</p>
							<img src={userIcon} alt="user-icon" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>2</p>
							<p>Select the desired plan (Premium or Standard).</p>
							<img src={handDiamond} alt="hand-diamond" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>3</p>
							<p>Complete the secure payment process (if applicable).</p>
							<img src={securePayment} alt="secure-payment" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>4</p>
							<p>Confirm your membership and gain access to benefits.</p>
							<img src={membershipIcon} alt="membership-icon" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Pricing
