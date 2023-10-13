const AnimatedBackground = () => {
  return (
    <div className="w-full max-h-[100%] fixed z-[-1]">
      {/* <video className="w-full max-h-[100%] object-cover" autoPlay loop muted>
        <source src="/sea1080-2.mp4" type="video/mp4" />
      </video> */}
      <video className="w-full max-h-[100%]" autoPlay loop muted>
        <source src="/rust-dome.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default AnimatedBackground;
