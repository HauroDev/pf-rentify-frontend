import imageNotFound from '../../assets/image/image-not-found.jpg'
import BtnAddCartCard from '../BtnAddCartCard'

const CardSearch = () => {
	return (
		<div className='w-full bg-white dark:bg-card_dark p-4 rounded-md shadow flex'>
			<section className='flex gap-2 items-center md:items-start w-10/12'>
				<div className='w-16 h-16 md:w-24 md:h-24'>
					<img src={imageNotFound} alt='not-found' className='w-full min-w-[64px] rounded' />
				</div>
				<div className='truncate'>
					<h3 className='truncate text-lg md:text-2xl'>Nombre del producto</h3>
					<p className='font-amaranth text-base md:text-xl'>
						$20.00 <span className='text-xs md:text-base'>USD</span>
					</p>
					<p className='text-gray_dark text-xs md:text-base md:mt-4'>fecha</p>
				</div>
			</section>
			<section className='self-end min-w-[32px] w-2/12 flex justify-end'>
				<BtnAddCartCard />
			</section>
		</div>
	)
}

export default CardSearch
