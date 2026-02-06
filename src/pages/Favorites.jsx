import { useEffect, useMemo, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites.js';
import { getMovieDetails, getSeriesDetails } from '../services/tmdb.js';
import MediaCard from '../components/MediaCard.jsx';

export default function Favorites() {
  const { favorites, clear } = useFavorites();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const count = favorites.length;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError('');

        if (count === 0) {
          setItems([]);
          return;
        }

        const data = await Promise.all(
          favorites.map(async (f) => {
            const d = f.type === 'tv' ? await getSeriesDetails(f.id) : await getMovieDetails(f.id);
            return { type: f.type, data: d };
          })
        );

        if (!alive) return;
        setItems(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Erreur de chargement');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [count, favorites]);

  const title = useMemo(() => {
    if (count === 0) return 'Favoris (0)';
    return `Favoris (${count})`;
  }, [count]);

  return (
    <div>
      <div className="text-white text-center pt-6 pb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mt-3">
          <button
            onClick={clear}
            disabled={count === 0}
            className="px-4 py-2 rounded-full bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
          >
            Vider les favoris
          </button>
        </div>
      </div>

      {error ? <div className="p-6 text-red-400">Erreur : {error}</div> : null}

      {loading ? (
        <div className="p-6 text-gray-300">Chargement…</div>
      ) : count === 0 ? (
        <div className="p-6 text-gray-400 text-center">Aucun favori pour le moment. (Snif)</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 place-items-center">
          {items.map(({ type, data }) => (
            <MediaCard key={`${type}-${data.id}`} item={data} type={type} />
          ))}
        </div>
      )}
    </div>
  );
}
