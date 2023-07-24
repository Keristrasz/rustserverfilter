import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedBackground from "./AnimatedBackground";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow relative">
        <AnimatedBackground />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
