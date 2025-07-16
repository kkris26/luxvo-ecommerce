const HomePage = () => {
  return (
    <div className="relative w-full overflow-hidden ">
      <video
        src="/video-home.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-auto "
      ></video>
    </div>
  );
};

export default HomePage;
