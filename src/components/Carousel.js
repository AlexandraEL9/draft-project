import React, { useState } from 'react';
import '../styles/Carousel.css';
import heroImage from '../assets/images/hero-img.png';

const slides = [
  {
    title: 'Create',
    text: 'Create and edit custom routines that work for you',
    image: heroImage,
    bgColor: 'var(--mint)'
  },
  {
    title: 'Play',
    text: 'Play your routines in real time to keep you on track and avoid distractions',
    image: heroImage,
    bgColor: 'var(--light-pink)'
  },
  {
    title: 'Motivate',
    text: 'Choose to opt in for daily motivational quotes',
    image: heroImage,
    bgColor: 'var(--pastel-blue)'
  }
];

function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-wrapper">
      <div
        className="carousel-container"
        style={{ backgroundColor: slides[currentSlide].bgColor }}
      >
        <button className="arrow left" onClick={prevSlide}>&lt;</button>

        <div className="carousel-slide">
          <div className="carousel-text">
            <h2>{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].text}</p>
          </div>
          <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
        </div>

        <button className="arrow right" onClick={nextSlide}>&gt;</button>
      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
