import social from '../assets/image/social-commerce-image.png';
import shippingCajita from '../assets/image/shipping-2.png'
import diamond from '../assets/image/diamond.jpg'
import userIcon from '../assets/image/user-icon.png';
import handDiamond from '../assets/image/hand-diamond.png';
import securePayment from '../assets/image/secure-payment.png';
import membershipIcon from '../assets/image/membership-icon.png'

import { useSelector } from 'react-redux';


const Pricing = () => {
	const {user} = useSelector(state=>state.user)
	console.log(user);
	return (
		<div>
			<div>
				<div>
					<h2>Rent-ify Membership</h2>
					<h3>Exclusive acces and special benefits</h3>
				</div>
				<img src={social} alt="social" />
			</div>

			<div>
				<h3>Unlock a world of convenience and savings with our exclusive membership program</h3>
				<div>
					<div>
						<p>Gain unlimited access to a wide range of items, enjoy discounted transaction fees, and receive top-notch support.</p>
					</div>
					<img src={shippingCajita} alt="shipping-cajita" />
					<div>
						<p>Whether you're a frequent renter or a savvy item owner, our membership offers a host of benefits tailored to enhance your renting experience.</p>
					</div>
				</div>
			</div>

			<div>
				<div><h3>Membership Plans</h3></div>
				<div>
					<div>
						<p>Standard Membership (Free)</p>
						<ul>
							<li>Up to 5 items listings per month.</li>
							<li>Standard transaction fees.</li>
							<li>Enjoy Rent-ify for free.</li>
						</ul>
						{
							user?.membership === "premium"
							? <button>Subscribe</button>
							: null
						}
					</div>

					<div>
						<p>Premium Membership</p>
						<ul>
							<li>Unlimited number of item listings per month.</li>
							<li>Reduced transaction fees</li>
							<li>Priority highlighting in search results</li>
							<li>Premium customer support</li>
							<li>Price: $X.XX per month</li>
						</ul>
						{
							user?.membership === "standard"
							? <button>Subscribe</button>
							: null
						}
					</div>
				</div>
			</div>

			<div>
				<div>
					<p>How to</p>
					<h3>Subscribe to MemberShip</h3>
				</div>
				<div>
					<div>
						<p>1</p>
						<p>Sign up or log in to your Rent-ify account.</p>
						<img src={userIcon} alt="user-icon" />
					</div>
					<div>
						<p>2</p>
						<p>Select the desired plan (Premium or Standard).</p>
						<img src={handDiamond} alt="hand-diamond" />
					</div>
					<div>
						<p>3</p>
						<p>Complete the secure payment process (if applicable).</p>
						<img src={securePayment} alt="secure-payment" />
					</div>
					<div>
						<p>4</p>
						<p>Confirm your membership and gain access to benefits.</p>
						<img src={membershipIcon} alt="membership-icon" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Pricing
