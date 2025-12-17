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
      {/* 🔥 CONTENT OVER VIDEO */}
      <div
        className="
          absolute
          left-6 md:left-16
          bottom-30 md:bottom-32
          max-w-[90%] md:max-w-[700px]
          text-white
        "
      >
        {/* TITLE */}
        <h1 className="text-2xl md:text-5xl font-extrabold leading-tight">
          {title}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-3 md:mt-4 text-sm md:text-lg text-gray-200 line-clamp-3">
          {overview}
        </p>

        {/* BUTTONS */}
        <div className="mt-5 flex gap-4">
          <button
            className="
              flex items-center gap-2
              bg-white text-black
              px-5 md:px-6 py-2
              text-sm md:text-lg font-semibold
              rounded
              hover:bg-gray-300
              transition
            "
          >
            ▶ Play
          </button>

          <button
            className="
              flex items-center gap-2
              bg-gray-500/70 text-white
              px-5 md:px-6 py-2
              text-sm md:text-lg font-semibold
              rounded
              hover:bg-gray-500
              transition
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
