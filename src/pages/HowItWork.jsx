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
		<div className='container mx-auto p-4'>
			<div className='flex flex-col items-center'>
				<div className='flex items-center  justify-center w-full '>
					<div className="h-48 w-1/2 bg-gray_medium p-4 flex items-center">
						<div className='h-4/5 w-3/4 flex flex-col justify-around'>
							<h2 className='text-4xl'>How renting works</h2>
							<p className='text-base'>Explore Placing an Order, the Advantages of Renting, and Our Commitment to Resource Conservation.</p>
						</div>
					</div>
					<img src={laptopYCajitas} alt="laptopCajira" className='h-48' />
				</div>

				<div>
					<div className='text-center'>
						<p className='text-gray_medium text-sm'>How it works</p>
						<h3 className='text-4xl'>Getting started with Rent-ify</h3>
					</div>

					<div className="flex justify-center mt-8 space-x-8">
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>1</p>
							<p>Find Your Ideal Rental</p>
							<p className='text-sm'>Explore vast product options. From tech to furniture, we have it all. Discover your perfect match.</p>
							<img src={consola} alt="consola" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>2</p>
							<p>Checkout</p>
							<p className='text-sm'>Select items and proceed to checkout. Credit check may apply. Get shipping details within 24 hours.</p>
							<img src={mobile} alt="mobile" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>3</p>
							<p>Enjoy your rental</p>
							<p className='text-sm'>Experience the benefits of your rented items. Fast delivery to your doorstep for maximum enjoyment.</p>
							<img src={shipping} alt="shipping" />
						</div>
						<div className='text-justify flex flex-col items-center justify-between'>
							<p>4</p>
							<p>Sustainable Refurbishment</p>
							<p className='text-sm'>Rent with us and experience convenience, flexibility, and resource conservation. Let's make a positive impact together!</p>
							<img src={cicle} alt="cicle" />
						</div>
					</div>
				</div>

				<div className='w-3/4'>
					<div className='text-center'>
						<p className='text-gray_medium text-sm'>Buying is over</p>
						<h3 className='text-4xl'>The benefits of renting</h3>
					</div>

					<div className="flex justify-center mt-8 space-x-8">
						<div className='text-justify flex flex-col items-center justify-between'>
							<p className='font-bold'>Low Monthly Costs</p>
							<img src={handCoin} alt="hand-coin" />
							<p className='text-sm'>Say goodbye to high upfront costs and long-term commitments. Rent a wide range of products at budget-friendly prices.</p>
						</div>

						<div className='text-justify flex flex-col items-center justify-between'>
							<p className='font-bold'>Flexible Rental Periods</p>
							<img src={calendar} alt="calendar" />
							<p className='text-sm'>Rent for as long as you need. Choose from flexible rental durations. Adjust your rental plan to match your changing needs.</p>
						</div>
						
						<div className=' text-justify flex flex-col items-center justify-between'>
							<p className='font-bold'>Environmental Impact</p>
							<img src={greenWorld} alt="green-world" />
							<p className='text-sm'>By renting, you help extend the lifespan of products, minimizing unnecessary consumption and promoting sustainability.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowItWork
