import { resetOrder, setEndpoint } from '../../app/features/products/productsSlice'
import { useModal } from '../../hooks/useModal'
import { orderByOptions } from '../../utils/order'
import { useSelector, useDispatch } from 'react-redux'
import CustomSelect from './CustomSelect'
import { setOrder, resetOffset } from '../../app/features/products/productsSlice'
import { retunrOffsetAndLimit } from '../../utils/filterAndPag'

const OrderSelect = () => {
	const [isOpen, openModal, closeModal] = useModal()
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleRestart = () => {
		dispatch(resetOffset())
		const endpointSplited = productState.endpoint.split('?')[0]
		const offsetLimit = retunrOffsetAndLimit(0, productState.limit)
		dispatch(setEndpoint(`${endpointSplited}?orderBy=&orderType=&${offsetLimit}`))
		dispatch(resetOrder())
		closeModal()
	}

	const handleSelect = (by, type) => {
		dispatch(resetOffset())
		const endpointSplited = productState.endpoint.split('?')[0]
		const offsetLimit = retunrOffsetAndLimit(0, productState.limit)
		dispatch(setEndpoint(`${endpointSplited}?orderBy=${by}&orderType=${type}&${offsetLimit}`))
		dispatch(setOrder({ orderBy: by, orderType: type }))
		closeModal()
	}

	return (
		<CustomSelect
			label='Order'
			messageSelect={
				productState.order.orderBy
					? `${productState.order.orderBy.toUpperCase()} ${productState.order.orderType}`
					: 'Sort by'
			}
			isOpen={isOpen}
			handleOpenClose={handleOpenModal}>
			<article
				className='hover:bg-dark_purple hover:text-white px-3 py-1 selection:bg-transparent'
				onClick={handleRestart}>
				Default
			</article>
			{orderByOptions.map((opt) => (
				<article
					key={opt.id}
					className='hover:bg-dark_purple hover:text-white px-3 py-1 selection:bg-transparent'
					onClick={() => handleSelect(opt.by, opt.type, opt.label)}>
					{opt.label}
				</article>
			))}
		</CustomSelect>
	)
}

export default OrderSelect
