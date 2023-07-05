/* eslint-disable react/prop-types */

import DeatilSectionContainer from './DeatilSectionContainer'
import DetailCard from './DetailCard'

const DetailsMid = ({ description }) => {
	return (
		<DeatilSectionContainer>
			<DetailCard>
				<div className='flex items-center'>
					
					<h2 className='text-3xl md:text-4xl'>Description</h2>
				</div>
				<div className='mt-8'>
					<p className='md:text-lg'>{description}</p>
				</div>
			</DetailCard>
		</DeatilSectionContainer>
	)
}

export default DetailsMid
