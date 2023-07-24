const AnimatedBackground = () => {
  return (
    <div className="w-full max-h-screen absolute z-[-1] overflow-hidden">
      {/* <video className="w-full h-full object-cover " autoPlay loop muted>
        <source src="/sea1080_2.mp4" type="video/mp4" />
      </video> */}
      <video className="w-full max-h-screen object-cover" autoPlay loop muted>
        <source src="/rust_dome.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
