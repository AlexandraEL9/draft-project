import "../index.scss";
import Footer from "../components/footer/Footer.js";
import Navbar from "../components/navbar/Navbar.js";
import Carousel from "../components/carousel/carousel.js";
import Hero from "../components/hero/Hero.js";

function Landing() {
  return (
    <>
      <Navbar/>
        <Hero/>
        <Carousel/> 
      <Footer />
    </>
  );
}

export default Landing;
