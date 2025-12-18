interface VideoTitleProps {
  title: string;
  overview: string;
}

const VideoTitle = ({ title, overview }: VideoTitleProps) => {
  return (
    <>
      {/* Mobile layout */}
  <div
  className="
    absolute bottom-95
    left-4 right-4
    flex flex-col gap-2
   text-white
    sm:hidden
    z-20
  "
>
  <h1 className="text-xl font-bold leading-snug ">
    {title}
  </h1>

  <p className="text-sm text-white line-clamp-2">
    {overview}
  </p>

  <div className="flex gap-3 mt-2">
    <button className="flex-1 bg-white text-black py-2 rounded-md text-sm font-semibold">
      ▶ Play
    </button>

    <button className="flex-1 bg-gray-800 text-white py-2 rounded-md text-sm">
      ✔ My List
    </button>
  </div>
</div>



      {/* Tablet / Desktop layout */}
      <div
        className="
          hidden sm:block
          absolute bottom-16 sm:bottom-14 md:bottom-20
          left-6 sm:left-10 md:left-16
          max-w-xl md:max-w-2xl lg:max-w-3xl
          text-white
        "
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]">
          {title}
        </h1>

        <p className="mt-4 text-sm md:text-lg lg:text-xl text-neutral-200 max-w-xl md:max-w-2xl line-clamp-4 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
          {overview}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            className="
              flex items-center gap-3
              px-6 md:px-8 py-2.5 md:py-3
              bg-white text-black font-bold
              rounded-md md:rounded-lg text-sm md:text-lg
              hover:bg-neutral-100 transition
            "
          >
            ▶ Play
          </button>
          <button
            className="
              flex items-center gap-3
              px-6 md:px-7 py-2.5 md:py-3
              bg-neutral-700/80 text-white font-semibold
              rounded-md md:rounded-lg text-sm md:text-lg
              hover:bg-neutral-600/80 transition
            "
          >
            ✔ My List
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoTitle;
