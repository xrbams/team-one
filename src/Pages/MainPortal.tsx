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
import { Grid } from "@mui/material";

function MainPortal() {
  return (
      <div>
        {/* <Navbar /> */}
        <Grid spacing={"23324"} paddingTop={"40px"}></Grid>

        <Layout />
        
      </div>
  );
}

export default MainPortal;
