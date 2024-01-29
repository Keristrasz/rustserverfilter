import React, { useState, useEffect } from "react";

import Header from "./subcomponents/Header";
import Footer from "./subcomponents/Footer";
import AnimatedBackground from "./subcomponents/AnimatedBackground";

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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isVideoBackgroundRendered && <AnimatedBackground />}
      <div className="flex-grow relative">{children}</div>
      <Footer />
    </div>
  );
};

export { Layout };
