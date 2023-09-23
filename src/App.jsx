import React from "react";
// import './App.css'
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Analytics from "./components/Analytics";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Card from "./components/Card/Card";
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Hero />
        <Analytics />
        <Newsletter />
        <Footer />
        {/* <Routes path="/login" element={<Login />} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
