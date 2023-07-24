import React from "react";

const AnimatedBackground = () => {
  // Generate a random number between 0 and 1
  const randomNum = Math.random();

  // Choose the video based on the random number
  const videoSource = randomNum < 0.5 ? "/sea1080_2.mp4" : "/rust_dome.mp4";

  return (
    <div className="w-full max-h-[100%] absolute z-[-1] overflow-hidden">
      <video className="w-full max-h-[100%] object-cover" autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
