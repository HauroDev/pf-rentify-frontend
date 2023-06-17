import { resetOrder, setEndpoint } from '../../app/features/products/productsSlice'
import { useModal } from '../../hooks/useModal'
import { orderByOptions } from '../../utils/order'
import { useSelector, useDispatch } from 'react-redux'
import CustomSelect from './CustomSelect'
import { setOrder } from '../../app/features/products/productsSlice'
import { useEffect } from 'react'

const OrderSelect = () => {
	const [isOpen, openModal, closeModal] = useModal()
	const dispatch = useDispatch()
	const productState = useSelector((state) => state.products)

	useEffect(() => {
		return () => {
			// dispatch(resetOrder())
		}
	}, [dispatch])

	const handleOpenModal = () => {
		if (isOpen) closeModal()
		else openModal()
	}

	const handleSelect = (by, type, label) => {
		const endpointSplited = productState.endpoint.split('?')[0]
		dispatch(setEndpoint(`${endpointSplited}?orderBy=${by}&orderType=${type}`))
		dispatch(setOrder(label))
		closeModal()
	}

	return (
		<CustomSelect
			label='Order'
			messageSelect={productState.order ? productState.order : 'Select Order'}
			isOpen={isOpen}
			handleOpenClose={handleOpenModal}>
			{orderByOptions.map((opt) => (
				<article key={opt.id}>
					<div
						className='hover:bg-dark_purple hover:text-light_purple px-3 py-1 selection:bg-transparent'
						onClick={() => handleSelect(opt.by, opt.type, opt.label)}>
						{opt.label}
					</div>
				</article>
			))}
		</CustomSelect>
	)
}

export default OrderSelect
