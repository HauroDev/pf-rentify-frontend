import laptopYCajitas from '../assets/image/laptop-cajitas.jpg';
import consola from '../assets/image/consola.jpg';
import mobile from '../assets/image/mobile.png';
import shipping from '../assets/image/shipping.png';
import cicle from '../assets/image/cicle.png';
import handCoin from '../assets/image/hand-coin.png';
import calendar from '../assets/image/calendar.png';
import greenWorld from '../assets/image/green-world.png';


const HowItWork = () => {
	return (
		<div>
			<div>
				<div>
					<div>
						<h2>How renting works</h2>
						<p>Explore Placing an Order, the Advantages of Renting, and Our Commitment to Resource Conservation.</p>
					</div>
				</div>
				<img src={laptopYCajitas} alt="" className='h-64' />
			</div>

			<div>
				<div>
					<p>How it works</p>
					<h3>Getting started with Rent-ify</h3>
				</div>

				<div>
					<div>
						<p>1</p>
						<p>Find Your Ideal Rental</p>
						<p>Explore vast product options. From tech to furniture, we have it all. Discover your perfect match.</p>
						<img src={consola} alt="consola" />
					</div>
					<div>
						<p>2</p>
						<p>Checkout</p>
						<p>Select items and proceed to checkout. Credit check may apply. Get shipping details within 24 hours.</p>
						<img src={mobile} alt="mobile" />
					</div>
					<div>
						<p>3</p>
						<p>Enjoy your rental</p>
						<p>Experience the benefits of your rented items. Fast delivery to your doorstep for maximum enjoyment.</p>
						<img src={shipping} alt="shipping" />
					</div>
					<div>
						<p>4</p>
						<p>Sustainable Refurbishment</p>
						<p>Rent with us and experience convenience, flexibility, and resource conservation. Let's make a positive impact together!</p>
						<img src={cicle} alt="cicle" />
					</div>
				</div>
			</div>

			<div>
				<div>
					<p>Buying is over</p>
					<h3>The benefits of renting</h3>
				</div>

				<div>
					<div>
						<p>Low Monthly Costs</p>
						<img src={handCoin} alt="hand-coin" />
						<p>Say goodbye to high upfront costs and long-term commitments. Rent a wide range of products at budget-friendly prices.</p>
					</div>

					<div>
						<p>Flexible Rental Periods</p>
						<img src={calendar} alt="calendar" />
						<p></p>
					</div>
					
					<div>
						<p>Environmental Impact</p>
						<img src={greenWorld} alt="green-world" />
						<p>By renting, you help extend the lifespan of products, minimizing unnecessary consumption and promoting sustainability.</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowItWork
