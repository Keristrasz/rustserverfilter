import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from "./AnimatedBackground";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  let isMobile = false;

  const MOBILE_WIDTH_THRESHOLD = 1000;
  isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow relative">
        {!isMobile && <AnimatedBackground />}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
