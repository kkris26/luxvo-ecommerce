const HomePage = () => {
  return (
    <div className="relative w-full overflow-hidden ">
      <video
        src="https://res.cloudinary.com/dbtathpqx/video/upload/v1752676181/video-test_zceqg9.mp4"
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
