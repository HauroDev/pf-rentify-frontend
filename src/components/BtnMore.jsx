/* eslint-disable react/prop-types */
const BtnMore = ({ label, onclick }) => {
	return (
		<button className='bg-dark_purple text-white text-xl py-2 px-6 rounded-md ' onClick={onclick}>
			{label}
		</button>
	)
}

export default BtnMore
