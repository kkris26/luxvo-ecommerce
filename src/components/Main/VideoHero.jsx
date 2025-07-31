const VideoHero = ({ src, poster }) => (
  <div className="relative w-full overflow-hidden">
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-[calc(100vh-64px)] sm:h-auto object-cover aspect-video"
    />
  </div>
);
export default VideoHero;
