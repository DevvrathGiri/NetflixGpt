import { IMG_CDN_URL } from "../Utils/constants";

interface MovieCardProps {
  posterPath: string;
}

const MovieCard = ({ posterPath }: MovieCardProps) => {
  if(!posterPath) return null;
  return (
    <div
      className="
        min-w-[160px] md:min-w-[170px]
        h-[240px] md:h-[255px]
        flex-shrink-0
        rounded-md
        overflow-hidden
        cursor-pointer
        transition-transform duration-300
        hover:scale-105
        hover:z-10
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
