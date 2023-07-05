import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'

import DetailsTop from '../components/Details/DetailsTop'
import DetailsMid from '../components/Details/DetailsMid'
import DetailComments from '../components/Details/DetailComments'
import Loader from '../components/Loader'
import DetailOwner from '../components/Details/DetailOwner'
import DetailInfo from '../components/Details/DetailInfo'
import { useSelector } from 'react-redux'

const initalState = {
	product: {},
	status: 'idle',
	error: null,
}

const DetailProduct = () => {
	const [state, setState] = useState(initalState)
	const userState = useSelector((state) => state.user)
	const { id } = useParams()

	const getProduct = async (id, set) => {
		set({
			status: 'loading',
			product: {},
			error: null,
		})
		try {
			const data = await getProductById(id)
			console.log(data)
			set({
				status: 'success',
				product: { ...data },
				error: null,
			})
			document.title = data.name || 'Rent-ify'
		} catch (error) {
			set({
				status: 'error',
				product: {},
				error: error.response.data.message,
			})
		}
	}

	useEffect(() => {
		getProduct(id, setState)
		return () => {
			setState(initalState)
			document.title = 'Rent-ify'
		}
	}, [id])

	if (state.status === 'loading')
		return (
			<div className='w-full grid place-content-center my-8'>
				<Loader />
			</div>
		)

	if (state.status === 'error') return <h3>Error: {state.error}</h3>

	return (
		<>
			{state.status === 'success' && (
				<div className='w-full min-h-full mx-auto flex flex-col gap-8'>
					{state.product.statusPub === 'active' && (
						<div className='flex justify-center gap-6'>
							<div>
								<DetailsTop image={state.product.image} />
								<div className='xl:hidden'>
									<DetailInfo
										idProd={state.product.idProd}
										location={state.product.location}
										name={state.product.name}
										price={state.product.price}
										updatedAt={state.product.updatedAt}
										country={state.product.country}
										image={state.product.image}
										status={state.product.statusPub}
									/>
								</div>

								<DetailsMid description={state.product.description} />

								<DetailOwner user={state.product.users[0]} product={state.product} />

								<DetailComments
									idProd={state.product.idProd}
									commentes={state.product.reviews.comments}
									star={state.product.reviews.stars}
									average={state.product.reviews.average}
									idcomment={state.product.reviews.comments}
									updated={state.product.reviews.updatedAt}
								/>
							</div>

							<div className='hidden xl:block sticky top-12 h-full bg-white dark:bg-card_dark rounded-lg'>
								<DetailInfo
									idProd={state.product.idProd}
									location={state.product.location}
									name={state.product.name}
									price={state.product.price}
									updatedAt={state.product.updatedAt}
									country={state.product.country}
									image={state.product.image}
									status={state.product.statusPub}
								/>
							</div>
						</div>
					)}

					{state.product.statusPub === 'inactive' &&
					state.product.users[0].idUser === userState.user.idUser ? (
						<div className='flex justify-center gap-6'>
							<div>
								<DetailsTop image={state.product.image} />
								<div className='xl:hidden'>
									<DetailInfo
										idProd={state.product.idProd}
										location={state.product.location}
										name={state.product.name}
										price={state.product.price}
										updatedAt={state.product.updatedAt}
										country={state.product.country}
										image={state.product.image}
										status={state.product.statusPub}
									/>
								</div>

								<DetailsMid description={state.product.description} />

								<DetailOwner user={state.product.users[0]} product={state.product} />

								<DetailComments
									idProd={state.product.idProd}
									commentes={state.product.reviews.comments}
									star={state.product.reviews.stars}
									average={state.product.reviews.average}
									idcomment={state.product.reviews.comments}
									updated={state.product.reviews.updatedAt}
								/>
							</div>

							<div className='hidden xl:block sticky top-12 h-full bg-white dark:bg-card_dark rounded-lg'>
								<DetailInfo
									idProd={state.product.idProd}
									location={state.product.location}
									name={state.product.name}
									price={state.product.price}
									updatedAt={state.product.updatedAt}
									country={state.product.country}
									image={state.product.image}
									status={state.product.statusPub}
								/>
							</div>
						</div>
					) : (
						''
					)}

					{state.product.statusPub === 'deleted' && (
						<div className='flex justify-center gap-6'>
							<h3>Product not avilable</h3>
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default DetailProduct
