import GithubIcon from '../components/icons/GithunIcon'
import LinkedinIcon from '../components/icons/LinkedinIcon'
import { team } from '../utils/team'

const AboutUs = () => {
	return (
		<div className='flex flex-col xl:flex-row gap-8'>
			<section className='xl:w-1/2'>
				<p className='text-4xl font-bold'>Our Team</p>
				<p className='text-sm mt-3 leading-6'>
					We are a passionate group of web developers with a common vision: to create engaging and
					functional digital experiences that bring your ideas to life in the online world.
				</p>
				<p className='text-sm mt-3 leading-6'>
					Somos un grupo apasionado de desarrolladores web con una visión común: crear experiencias
					digitales cautivadoras y funcionales que hagan que tus ideas cobren vida en el mundo en
					línea.
				</p>
			</section>

			<section className='w-full xl:w-1/2 xl:justify-items-end grid grid-cols-1 sm:grid-cols-2 gap-8'>
				{team.map((member) => (
					<figure key={member.id} className='w-full'>
						<div className='w-full h-80 sm:h-[310px] md:h-72 overflow-hidden rounded-2xl'>
							<img src={member.photo} alt={member.name} className='w-full h-full object-cover' />
						</div>
						<figcaption className='flex flex-col gap-2 mt-4'>
							<p className='text-xl font-bold'>{member.name}</p>
							<p className='text-base text-gray_dark'>{member.rol}</p>
							<p className='text-base text-gray_dark'>{member.location}</p>
							<div className='flex gap-4'>
								<a href={member.links.linkedin} target='_blanck' rel='noreferrer'>
									<LinkedinIcon className='stroke-body_dark dark:stroke-white hover:stroke-medium_purple dark:hover:stroke-medium_purple' />
								</a>
								<a href={member.links.github} target='_blanck' rel='noreferrer'>
									<GithubIcon className='stroke-body_dark dark:stroke-white hover:stroke-medium_purple dark:hover:stroke-medium_purple' />
								</a>
							</div>
						</figcaption>
					</figure>
				))}
			</section>
		</div>
	)
}

export default AboutUs
