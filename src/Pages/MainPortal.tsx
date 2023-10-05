import React from "react";
import Hero from "../components/Hero";
import Navbar from "./Portal/Navbar";
import Analytics from "../components/Analytics";
import Newsletter from "../components/Company";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Card from "../components/Card/Card";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Portal/Layout";

function MainPortal() {
  return (
      <div>
        {/* <Navbar /> */}
        <Layout />
        
      </div>
  );
}

export default MainPortal;
