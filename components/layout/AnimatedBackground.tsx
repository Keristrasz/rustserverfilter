const AnimatedBackground = () => {
  return (
    <div className="max-w-full max-h-full absolute z-[-1] overflow-hidden">
      {/* <video className="max-w-full h-full object-cover " autoPlay loop muted>
        <source src="/sea1080_2.mp4" type="video/mp4" />
      </video> */}
      <video className="max-w-full max-h-full object-cover" autoPlay loop muted>
        <source src="/rust_dome.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
