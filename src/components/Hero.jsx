import { useRef } from 'react';
// import Typed from 'react-typed';
import video from '../assets/j.mp4'
import { Link, Element } from 'react-scroll';


const HeroVideo = () => {
  return (
    <div className="hero-video">
      <video src={video} autoPlay loop muted />
    </div>
  );
};
const Hero = () => {

  return (
    <Element id="home">

    <div className="text-white">
      <HeroVideo />

      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">

        <p className="text-[#00df9a] font-bold p-2">
          EUROPE'S BEST GRAD RECRUITMENT HUB
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
          Get access to the largest pool of Gen Z talent{" "}
        </h1>
       
        <p className="md:text-[#ecffe8] text-xl font-bold text-gray-500">
          Easily recruit the best students and young graduates all over Europe.
        </p>
        <button href="/login" className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          Get Started
        </button>
      </div>
    </div>
    </Element >

  );
};

export default Hero;
