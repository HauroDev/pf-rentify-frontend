import React, { useState } from 'react'

const FAQS = () => {
	const [activeIndex, setActiveIndex] = useState(null)
	const [showContactForm, setShowContactForm] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: '',
	})

	const handleQuestionClick = (index) => {
		if (activeIndex === index) {
			setActiveIndex(null)
		} else {
			setActiveIndex(index)
		}
	}

	const handleAskQuestionClick = () => {
		setShowContactForm(!showContactForm)
	}

	const handleFormInputChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		// Aquí puedes realizar las acciones necesarias con los datos del formulario
		console.log(formData)
		// Por ejemplo, enviar los datos del formulario a través de una solicitud HTTP

		// Restablecer el formulario después de enviar
		setFormData({
			name: '',
			email: '',
			message: '',
		})
		// Ocultar el formulario y mostrar el botón "Ask a Question" nuevamente
		setShowContactForm(false)
	}

	const faqsData = [
		{
			question: 'What is included in the Rent-ify Premium Membership?',
			answer:
				'The Rent-ify Premium Membership includes unlimited access to our catalog of items, reduced transaction fees, priority highlighting in search results, and premium customer support.',
		},
		{
			question: 'Can I switch between the Standard and Premium Membership plans?',
			answer:
				'Yes, you can switch between the Standard and Premium Membership plans at any time. Simply go to your account settings and choose the desired membership plan.',
		},
		{
			question: 'Are there any additional fees besides the membership cost?',
			answer:
				'No, there are no additional fees besides the cost of the membership plan. However, keep in mind that standard transaction fees apply to all rentals.',
		},
		{
			question: 'Is there a minimum commitment period for the Rent-ify Membership?',
			answer:
				'No, there is no minimum commitment period for the Rent-ify Membership. You can cancel your membership at any time without any penalties.',
		},
		{
			question:
				'What happens if I exceed the maximum number of item listings with the Standard Membership?',
			answer:
				'If you exceed the maximum number of item listings allowed with the Standard Membership, you will need to upgrade to the Premium Membership to enjoy unlimited item listings per month.',
		},
	]

	return (
		<div className='max-w-6xl mx-auto px-4'>
			<h2 className='text-4xl text-center mb-6'>FAQ's</h2>
			<div className='bg-white dark:bg-card_dark shadow-md rounded-lg'>
				{faqsData.map((faq, index) => (
					<div
						key={index}
						className={`p-6 border-b dark:bg-card_dark border-gray_medium ${
							activeIndex === index ? 'bg-gray_light' : ''
						}`}>
						<div
							className={`flex justify-between items-center ${
								activeIndex === index ? 'text-medium_purple' : 'text-text_light dark:text-white'
							}`}
							onClick={() => handleQuestionClick(index)}>
							<h3 className='text-2xl font-semibold cursor-pointer'>{faq.question}</h3>
							<button className='text-medium_purple focus:outline-none text-3xl'>
								{activeIndex === index ? '−' : '+'}
							</button>
						</div>
						{activeIndex === index && (
							<p className='text-text_light dark:text-white text-lg mt-2'>{faq.answer}</p>
						)}
					</div>
				))}
			</div>
			<div className='mt-4 flex flex-col items-center'>
				{!showContactForm ? (
					<button
						className='bg-medium_purple text-white text-xl py-2 px-4 rounded hover:bg-dark_purple'
						onClick={handleAskQuestionClick}>
						Ask a Question
					</button>
				) : (
					<div className='flex flex-row w-full'>
						<div className='w-1/2 text-center py-8'>
							<p className='text-2xl'>Hi 👋 !</p>
							<p className='text-lg mt-4'>
								If you are unable to find the answer to your question, please don&apos;t hesitate to
								contact our dedicated support team. Our team is available Monday through Friday,
								from 9 am to 6 pm (GMT). To get in touch, kindly fill out the contact form below,
								and we will respond to your inquiry promptly.
							</p>
						</div>
						<div className='w-1/2'>
							<form onSubmit={handleSubmit} className='flex flex-col items-center'>
								<input
									type='text'
									placeholder='Name'
									name='name'
									value={formData.name}
									onChange={handleFormInputChange}
									className='w-full px-4 py-2 mb-4 rounded border text-black border-gray_medium focus:outline-none'
								/>
								<input
									type='email'
									placeholder='Email'
									name='email'
									value={formData.email}
									onChange={handleFormInputChange}
									className='w-full px-4 py-2 mb-4 rounded border text-black border-gray_medium focus:outline-none'
								/>
								<textarea
									placeholder='Message'
									rows='4'
									name='message'
									value={formData.message}
									onChange={handleFormInputChange}
									className='w-full px-4 py-2 mb-4 rounded border text-black border-gray_medium focus:outline-none'
								/>
								<button
									type='submit'
									className='bg-medium_purple text-white text-xl py-2 px-4 rounded hover:bg-dark_purple'>
									Submit
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default FAQS
