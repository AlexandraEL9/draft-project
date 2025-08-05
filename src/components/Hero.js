// Hero.js
// Hero.js
import React from 'react';
import '../styles/Hero.css';
import heroImage from '../assets/images/hero-img.png';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h2>Build Better Routines</h2>
          <p>Your day, your way. Plan it right.</p>
          <button className="login-button">Get Started</button>
        </div>
        <div className="hero-image">
          <img
            src={heroImage}
            alt="Person planning daily routine"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
