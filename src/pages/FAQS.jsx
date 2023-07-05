import React, { useState, useEffect, useContext } from 'react'
import { contactContacUsService } from '../services/contactService'
import { ToastContext } from '../context/ToastContext'
import { useForm } from 'react-hook-form'
import { FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const FAQS = () => {
	const [activeIndex, setActiveIndex] = useState(null)
	const [showContactForm, setShowContactForm] = useState(false)
	const userState = useSelector((state) => state.user)
	const { register, handleSubmit, reset } = useForm()

	const { addToast } = useContext(ToastContext)

	useEffect(() => {
		if (showContactForm) {
			reset()
		}
	}, [showContactForm])

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

	const onSubmit = async (data) => {
		if (showContactForm) {
			try {
				await contactContacUsService(data)
				addToast({
					title: 'Success',
					description: 'Contact form submitted successfully',
					type: 'success',
				})
			} catch (error) {
				console.error('Error submitting contact form:', error)
				addToast({
					title: 'Error',
					description: 'Error submitting contact form',
					type: 'danger',
				})
			}
		} else {
			try {
				await contactOwnerService({
					email: data.email,
					name: data.name,
					message: data.message,
				})
				addToast({
					title: 'Success',
					description: 'Message sent',
					type: 'success',
				})
			} catch (error) {
				console.error('Error sending message to owner:', error)
				addToast({
					title: 'Error',
					description: 'Error sending message to owner',
					type: 'danger',
				})
			}
		}

		setShowContactForm(false)
		reset()
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
		<div className='min-w-[350px] max-w-6xl mx-auto px-4'>
			<h2 className='text-5xl md:text-6xl text-center mb-6 font-bold text-medium_purple'>
				FAQ&apos;s
			</h2>
			<div className='bg-white dark:bg-card_dark shadow-md rounded-lg'>
				{faqsData.map((faq, index) => (
					<div
						key={index}
						className={`p-6 border-b dark:bg-card_dark border-gray_medium ${
							activeIndex === index ? 'bg-gray_light dark:bg-selected_dark' : ''
						}`}>
						<div
							className={`flex justify-between items-center ${
								activeIndex === index
									? 'text-medium_purple dark:text-light_purple'
									: 'text-text_light dark:text-white'
							}`}
							onClick={() => handleQuestionClick(index)}>
							<h3 className='text-2xl cursor-pointer'>{faq.question}</h3>
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
			<div className='mt-4 flex flex-col items-start mb-8'>
				{!showContactForm ? (
					<button
						className='bg-medium_purple text-white text-xl py-2 px-4 rounded hover:bg-dark_purple'
						onClick={handleAskQuestionClick}>
						Ask a Question
					</button>
				) : (
					<div className='flex flex-col lg:flex-row w-full gap-8'>
						<section className='w-full text-left py-4'>
							<p className='text-2xl'>
								Hi{' '}
								<span className='text-medium_purple'>
									{(userState.login && userState.user.name) || ''}
								</span>
								👋 !
							</p>
							<p className='text-lg'>
								If you are unable to find the answer to your question, please contact our support
								team for any inquiries. We&apos;re here to help.
							</p>
							<div className='flex justify-start mt-4'>
								<FaClock size={20} />
								<span className='ml-2'>Monday to Friday, 9 am to 6 pm (GMT)</span>
							</div>
							<div className='flex justify-start mt-4'>
								<FaPhone size={20} />
								<span className='ml-2'>123-456-7890</span>
							</div>
							<div className='flex justify-start mt-2'>
								<FaEnvelope size={20} />
								<span className='ml-2'>rent.ify.soporte@gmail.com</span>
							</div>
						</section>
						<section className='w-full'>
							<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center '>
								<input
									type='text'
									placeholder='Name'
									name='name'
									{...register('name')}
									className='w-full px-4 py-2 mb-4 border dark:text-text_dark dark:bg-card_dark border-gray_medium rounded focus:outline-none focus:ring focus:border-medium_purple'
								/>
								<input
									type='email'
									placeholder='Email'
									name='email'
									{...register('email')}
									className='w-full px-4 py-2 mb-4 border dark:text-text_dark dark:bg-card_dark border-gray_medium rounded focus:outline-none focus:ring focus:border-medium_purple'
								/>
								<textarea
									placeholder='Message'
									rows='4'
									name='message'
									{...register('message')}
									className='w-full px-4 py-2 mb-4 border dark:text-text_dark dark:bg-card_dark border-gray_medium rounded focus:outline-none focus:ring focus:border-medium_purple'
								/>
								<button
									type='submit'
									className='bg-medium_purple text-white text-xl py-2 px-4 rounded hover:bg-dark_purple'>
									Submit
								</button>
							</form>
						</section>
					</div>
				)}
			</div>
		</div>
	)
}

export default FAQS
