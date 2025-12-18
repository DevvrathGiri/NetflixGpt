import { IMG_CDN_URL } from "../Utils/constants";

interface MovieCardProps {
  posterPath: string;
}

const MovieCard = ({ posterPath }: MovieCardProps) => {
  if (!posterPath) return null;

  return (
    <div className="
      flex-shrink-0 w-28 xs:w-32 sm:w-36 md:w-44 lg:w-48 h-40 xs:h-44 sm:h-48 md:h-56 lg:h-64
      rounded-md lg:rounded-lg overflow-hidden cursor-pointer
      group relative bg-neutral-900/50 backdrop-blur-sm
      hover:scale-110 md:hover:scale-115 lg:hover:scale-120
      hover:z-10 transition-all duration-300 ease-out
      border border-neutral-800/50 hover:border-neutral-600/80
      shadow-lg hover:shadow-2xl hover:shadow-neutral-900/50
    ">
      <img
        src={IMG_CDN_URL + posterPath}
        alt="Movie"
        className="
          w-full h-full object-cover transition-transform duration-500
          group-hover:scale-110 group-hover:brightness-110
          group-hover:grayscale-0 group-hover:contrast-110
        "
      />
      
      {/* Hover Overlay */}
      <div className="
        absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent
        opacity-0 group-hover:opacity-100 transition-all duration-300
        flex items-end p-2
      ">
        <div className="text-white text-xs lg:text-sm font-semibold truncate w-full">
          Play
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
