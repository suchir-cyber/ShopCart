import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-pink-500 px-2 py-0.5 text-xs text-white ring-2 ring-accent ring-offset-2 ring-offset-neutral-900">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;