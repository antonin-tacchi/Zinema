import { useFavorites } from '../hooks/useFavorites.js';

export default function StarButton({ id, type, className = '' }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(id, type);

  return (
    <button
      type="button"
      aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id, type);
      }}
      className={
        "star-container absolute top-2 left-2 bg-black/60 rounded-full w-7 h-7 flex items-center justify-center z-10 ring-1 ring-inset ring-yellow-600/50 focus:outline-none " +
        className
      }
      data-id={id}
      data-type={type}
    >
      {/* vide */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        className={"w-4 h-4 absolute pointer-events-none " + (fav ? 'hidden' : 'block')}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>

      {/* pleine */}
      <svg
        viewBox="0 0 24 24"
        fill="#FFD600"
        className={"w-4 h-4 absolute pointer-events-none " + (fav ? 'block' : 'hidden')}
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </button>
  );
}
