import CardSearch from '../CardSearch'

/* eslint-disable react/prop-types */
const CardsSearch = ({ products = [] }) => {
	return (
		<div className='grid gap-4 w-full mb-8'>
			{products.map((product) => (
				<CardSearch
					key={product.idProd}
					closeModal={null}
					id={product.idProd}
					image={product.image}
					name={product.name}
					price={product.price}
					updatedAt={product.updatedAt}
					country={product.country}
					isOnModal={false}
				/>
			))}
		</div>
	)
}

export default CardsSearch
