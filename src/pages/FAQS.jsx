import React, { useState } from 'react';

const FAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    if (activeIndex === index) {
      // Si la pregunta ya está abierta, la cerramos
      setActiveIndex(null);
    } else {
      // Si la pregunta está cerrada, la abrimos
      setActiveIndex(index);
    }
  };

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
      question: 'What happens if I exceed the maximum number of item listings with the Standard Membership?',
      answer:
        'If you exceed the maximum number of item listings allowed with the Standard Membership, you will need to upgrade to the Premium Membership to enjoy unlimited item listings per month.',
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-3xl text-center mb-6">FAQs</h2>
      <div className="border border-gray_medium rounded-lg p-6">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className={`mb-4 p-4 border border-gray_medium rounded-lg ${
              activeIndex === index ? 'bg-gray_light' : 'bg-white'
            }`}
          >
            <h3
              className={`text-xl font-semibold cursor-pointer ${
                activeIndex === index ? 'text-medium_purple' : 'text-text_light'
              }`}
              onClick={() => handleQuestionClick(index)}
            >
              {faq.question}
            </h3>
            {activeIndex === index && (
              <p className="text-text_light mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button className="bg-medium_purple text-white py-2 px-4 rounded hover:bg-dark_purple">
          Ask a Question
        </button>
      </div>
    </div>
  );
};

const handleAskQuestion = () => {
  // Lógica para mostrar el formulario de contacto
};

export default FAQS;
