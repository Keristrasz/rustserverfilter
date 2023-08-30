import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from "./AnimatedBackground";
import { useEffect } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // causes hydration errors
  // let isVideoBackgroundRendered = false;
  const MOBILE_WIDTH_THRESHOLD = 800;

  const [isVideoBackgroundRendered, setIsVideoBackgroundRendered] = useState(false);

  useEffect(() => {
    setIsVideoBackgroundRendered(
      typeof window !== "undefined" && window.innerWidth > MOBILE_WIDTH_THRESHOLD
    );
  }, []);
  // isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow relative">
        {isVideoBackgroundRendered && <AnimatedBackground />}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
