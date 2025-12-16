type Props = {
  title: string;
  overview: string;
};

const VideoTitle = ({ title, overview }: Props) => {
  return (
    <div
      className="
        absolute inset-0 z-10
        bg-gradient-to-r from-black/70 via-black/30 to-transparent
      "
    >
      <div className="pt-[18%] px-12 md:px-24 max-w-[700px] text-white">
        
        {/* Title */}
        <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-4 text-sm md:text-lg text-gray-200 line-clamp-3">
          {overview}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            className="
              flex items-center gap-2
              bg-white text-black px-6 py-2
              text-sm md:text-lg font-semibold
              rounded hover:bg-gray-300 transition
            "
          >
            ▶ Play
          </button>

          <button
            className="
              flex items-center gap-2
              bg-gray-500/70 text-white px-6 py-2
              text-sm md:text-lg font-semibold
              rounded hover:bg-gray-500 transition
            "
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
