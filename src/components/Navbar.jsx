import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link, Element } from "react-scroll";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  
  
  const handleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setNavVisible(lastScrollTop > currentScrollTop || currentScrollTop <= 0);
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);
  

  return (
    <>
<div className={`fixed-navbar flex justify-between items-center h-24 w-full text-white ${navVisible ? '' : 'hidden-navbar'}`}>
        <div className="max-w-[1240px] mx-auto px-4 w-full flex justify-between items-center">
          <nav className="flex justify-between items-center w-full">
                    <Link to="home" smooth={true}>
            <button>
              <h1 className="text-3xl font-bold text-[#00df9a]">
                RECRUIT ZILLA.
              </h1>
            </button>
          </Link>
          <ul className="hidden md:flex">
            <Link to="home" smooth={true}>
              <button className="p-4">Home</button>
            </Link>
            <Link to="company" smooth={true}>
              <button className="p-4">Company</button>
            </Link>
            <Link to="contact" smooth={true}>
              <button className="p-4">Contact</button>
            </Link>
          </ul>
        </nav>

        <div onClick={handleNav} className="block md:hidden">
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <ul
          className={
            nav
              ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
              : "ease-in-out duration-500 fixed left-[-100%]"
          }
        >
          <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
            RECRUIT ZILLA.
          </h1>
          <ul>
            <Link to="home" smooth={true}>
              <li className="p-4 border-b border-gray-600">
                <button>Home</button>
              </li>
            </Link>
            <Link to="company" smooth={true}>
              <li className="p-4 border-b border-gray-600">
                <button>Company</button>
              </li>
            </Link>
            <Link to="contact" smooth={true}>
              <li className="p-4 border-b border-gray-600">
                <button>Contact</button>
              </li>
            </Link>
          </ul>
        </ul>
      </div>
      </div>
      <div className="navbar-placeholder h-24"></div> {/* Placeholder Element */}

    </>
  );
};

export default Navbar;
