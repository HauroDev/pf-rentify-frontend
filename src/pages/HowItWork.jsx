import React, { useState } from 'react';
import laptopYCajitas from '../assets/image/laptop-cajitas.jpg';
import consola from '../assets/image/consola.jpg';
import mobile from '../assets/image/mobile.png';
import shipping from '../assets/image/shipping.png';
import cicle from '../assets/image/cicle.png';
import handCoin from '../assets/image/hand-coin.png';
import calendar from '../assets/image/calendar.png';
import greenWorld from '../assets/image/green-world.png';

const HowItWork = () => {
  const [currentSlide, setCurrentSlide] = useState(0); // Estado del índice del carrusel

  const slides = [
    {
      title: 'Find Your Ideal Rental',
      description: 'Explore vast product options. From tech to furniture, we have it all. Discover your perfect match.',
      image: consola,
    },
    {
      title: 'Checkout',
      description: 'Select items and proceed to checkout. Credit check may apply. Get shipping details within 24 hours.',
      image: mobile,
    },
    {
      title: 'Enjoy your rental',
      description: 'Experience the benefits of your rented items. Fast delivery to your doorstep for maximum enjoyment.',
      image: shipping,
    },
    {
      title: 'Sustainable Refurbishment',
      description: 'Rent with us and experience convenience, flexibility, and resource conservation. Let\'s make a positive impact together!',
      image: cicle,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => prevSlide - 1);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="h-60 md:w-1/2 bg-gray_light dark:bg-card_dark p-4 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-bold text-medium_purple mb-4">
                How renting works
              </h2>
              <p className="text-xl leading-7 text-text_light dark:text-text_dark">
                Explore placing an order, the advantages of renting, and our commitment to resource conservation.
              </p>
            </div>
          </div>
          <img src={laptopYCajitas} alt="laptopCajira" className="h-60 md:w-1/2 object-cover" />
        </div>

        <div>
          <div className="text-center mt-8">
            <p className="text-text_gray font-bold text-md">How it works</p>
            <h3 className="text-4xl font-bold text-medium_purple">Getting started with Rent-ify</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-8 md:space-y-0 md:space-x-1">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`relative w-full md:w-1/2 transform transition-transform duration-500 ${
                  index === currentSlide ? 'opacity-100 scale-100' : 'opacity-50 scale-90'
                }`}
              >
                <div className="text-justify flex flex-col items-center justify-between p-4 h-full">
                  <p className="text-2xl font-bold text-medium_purple">{index + 1}</p>
                  <p className="text-xl font-bold mb-2">{slide.title}</p>
                  <p className="text-lg leading-6 text-text_light dark:text-text_dark">
                    {slide.description}
                  </p>
                  <img src={slide.image} alt={slide.title} className="mt-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-center mt-4">
            <button
              onClick={prevSlide}
              className={`mr-4 p-2 rounded-full bg-medium_purple hover:bg-dark_purple text-white transition-opacity duration-300 hover:opacity-75 ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentSlide === 0}
            >
              Prev
            </button>
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full bg-medium_purple hover:bg-dark_purple text-white transition-opacity duration-300 hover:opacity-75 ${
                currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentSlide === slides.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div>
          <div className="text-center mt-8">
            <p className="text-text_gray font-bold text-md">Buying is over</p>
            <h3 className="text-4xl font-bold text-medium_purple">The benefits of renting</h3>
          </div>

          <div className="flex flex-col md:flex-row justify-center mt-8 space-y-8 md:space-y-0 md:space-x-12">
            <div className="text-justify flex flex-col items-center justify-between p-4">
              <p className="text-xl font-bold text-medium_purple">Low Monthly Costs</p>
              <img src={handCoin} alt="hand-coin" className="my-4 h-20 w-20" />
              <p className="text-lg leading-6 text-text_light dark:text-text_dark">
                Say goodbye to high upfront costs and long-term commitments. Rent a wide range of products at budget-friendly prices.
              </p>
            </div>

            <div className="text-justify flex flex-col items-center justify-between p-4">
              <p className="text-xl font-bold text-medium_purple">Flexible Rental Periods</p>
              <img src={calendar} alt="calendar" className="my-4 h-20 w-20" />
              <p className="text-lg leading-6 text-text_light dark:text-text_dark">
                Rent for as long as you need. Choose from flexible rental durations. Adjust your rental plan to match your changing needs.
              </p>
            </div>

            <div className="text-justify flex flex-col items-center justify-between p-4">
              <p className="text-xl font-bold text-medium_purple">Environmental Impact</p>
              <img src={greenWorld} alt="green-world" className="my-4 h-18 w-18" />
              <p className="text-lg leading-6 text-text_light dark:text-text_dark">
                By renting, you help extend the lifespan of products, minimizing unnecessary consumption and promoting sustainability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
