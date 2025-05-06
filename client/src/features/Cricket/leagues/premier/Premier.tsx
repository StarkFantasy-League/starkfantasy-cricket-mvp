"use client";

import Header from "../../../../shared/components/header/page";
import Sidebar from "../../../../shared/components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; 
import UpcomingMatches from "../components/upcomingMatches";
import PerformanceStats from "../components/performanceStats";
import TopScorers from "../components/topScorers";
import { motion } from "framer-motion";

const PremierLeague = () => {
  const [user, setUser] = useState({
    isConnected: true,
    walletAddress: "0x1234abcd5678efgh",
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  useEffect(() => {    
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);
    
    const switchTimer = setTimeout(() => {
      setShowWelcome(false);
      setFadeIn(true);
    }, 5000);
    
    const fadeInTimer = setTimeout(() => {
      setFadeIn(false);
    }, 6000);
        
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(switchTimer);
      clearTimeout(fadeInTimer);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 1,
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full h-screen text-white flex flex-col overflow-hidden">
      <Header className="relative z-30" bgNoTransparent />

      <button
        onClick={toggleSidebar}
        className="fixed top-[65px] left-4 z-[1100] md:hidden bg-black/50 backdrop-blur-sm text-white p-2 rounded-md shadow-md"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <div
        className={`fixed top-[60px] md:top-[100px] left-0 h-full w-64 bg-[#1F1B2C] z-[1000] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar currentImage="../src/assets/images/indianLeague.png" />
      </div>

      <div className={`flex flex-col flex-grow md:ml-64 ${isSidebarOpen ? 'ml-0' : ''}`}>
        <img
          src="../src/assets/leagues/indianLeaguePage.png"
          alt="Premier League Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#221D2F]/[0.82] via-[#1F1B2C]/[0.31] to-[#1D1829]/[0] z-10" />

        <div className="relative z-20 flex flex-col p-4 md:p-8 lg:p-12 flex-grow justify-center items-center">
          {user.isConnected ? (
            showWelcome ? (
              <motion.div 
                className={`text-center ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <motion.h2 
                  className="text-sm md:text-lg lg:text-2xl tracking-[0.1em] md:tracking-[0.2em] uppercase mb-2"
                  variants={item}
                >
                  Welcome to
                </motion.h2>
                <motion.h1 
                  className="text-[30px] sm:text-[50px] md:text-[70px] lg:text-[90px] font-black leading-tight"
                  variants={item}
                >
                  Indian Premier League
                </motion.h1>
                <motion.h3 
                  className="text-xs sm:text-sm md:text-xl lg:text-3xl font-medium mt-2 md:mt-4 tracking-[0.5em] sm:tracking-[1em] md:tracking-[1.5em] lg:tracking-[1.7em]"
                  variants={item}
                >
                  Tournament
                </motion.h3>
              </motion.div>
            ) : (
              <div className={`w-full h-full overflow-auto transition-all duration-1000 ease-in-out ${fadeIn ? 'animate-fadeIn' : ''}`}>
                <h1 className="text-4xl font-bold mb-8">Indian Premier League</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-3/5">
                    <UpcomingMatches />
                  </div>
                  <div className="w-full lg:w-2/5">
                    <PerformanceStats />
                  </div>
                </div>
                <div className="mt-8">
                  <TopScorers />
                </div>
              </div>
            )
          ) : (
            <p className="text-sm md:text-base text-center">
              Connect your wallet to join the tournament
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PremierLeague;