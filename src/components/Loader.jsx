/* eslint-disable react/prop-types */
import '../styles/Loader.css'

const Loader = ({ size }) => {
	const sizeLoder = {
		sm: 'w-[24px] h-[24px]',
		md: 'w-[36px] h-[36px]',
		lg: 'w-[52px] h-[52px]',
	}

	const classSize = sizeLoder[size] || sizeLoder.md

	return (
		<div className={`loader ${classSize}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	)
}

export default Loader
