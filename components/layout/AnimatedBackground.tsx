const AnimatedBackground = () => {
  return (
    <div className="w-full h-full absolute z-[-1] overflow-hidden mt-20">
      {/* <video className="w-full h-full object-cover " autoPlay loop muted>
        <source src="/sea1080_2.mp4" type="video/mp4" />
      </video> */}
      <video className="w-full h-auto object-cover" autoPlay loop muted>
        <source src="/rust_dome.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
