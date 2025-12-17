import { IMG_CDN_URL } from "../Utils/constants";

interface MovieCardProps {
  posterPath: string;
}

const MovieCard = ({ posterPath }: MovieCardProps) => {
  if (!posterPath) return null;

  return (
    <div
      className="
        flex-shrink-0
        rounded-md overflow-hidden cursor-pointer
        transition-transform duration-300
        hover:scale-105 hover:z-10
        min-w-[120px] xs:min-w-[140px] sm:min-w-[150px] md:min-w-[170px]
        h-[180px]   xs:h-[210px]      sm:h-[230px]      md:h-[255px]
      "
    >
      <img
        src={IMG_CDN_URL + posterPath}
        alt="Movie"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MovieCard;
