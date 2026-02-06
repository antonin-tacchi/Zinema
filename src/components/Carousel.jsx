import { useRef } from 'react';
import MediaCard from './MediaCard.jsx';

function ArrowLeftIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRightIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function Carousel({ title, items = [], type }) {
  const scrollerRef = useRef(null);

  const scrollBy = (dx) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  return (
    <section className="my-12 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <div className="relative">
        {/* Flèche gauche */}
        <button
          onClick={() => scrollBy(-600)}
          aria-label="Précédent"
          className="
            absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-12 h-12
            flex items-center justify-center
            rounded-full
            bg-black/70 hover:bg-black
            ring-1 ring-inset ring-gray-600
            text-white
            transition
          "
        >
          <ArrowLeftIcon className="w-7 h-7" />
        </button>

        {/* Flèche droite */}
        <button
          onClick={() => scrollBy(600)}
          aria-label="Suivant"
          className="
            absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-12 h-12
            flex items-center justify-center
            rounded-full
            bg-black/70 hover:bg-black
            ring-1 ring-inset ring-gray-600
            text-white
            transition
          "
        >
          <ArrowRightIcon className="w-7 h-7" />
        </button>

        {/* Track */}
        <div
          ref={scrollerRef}
          className="
            flex gap-4
            overflow-x-auto
            pb-3
            scroll-smooth
            px-14
            scrollbar-hide
          "
        >
          {items.map((it) => (
            <div key={it.id} className="shrink-0">
              <MediaCard item={it} type={type} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
