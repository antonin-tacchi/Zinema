import { useEffect, useState } from 'react';
import { getPopularMovies } from '../services/tmdb.js';
import MediaCard from '../components/MediaCard.jsx';
import Pagination from '../components/Pagination.jsx';

const PER_PAGE = 12;

export default function Movies() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getPopularMovies(page);
        if (!alive) return;
        const results = (data?.results || []).slice(0, PER_PAGE);
        const total = Math.min(Number(data?.total_pages || 1), 500);
        setItems(results);
        setTotalPages(total);
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
  }, [page]);

  return (
    <div>
      <div className="text-white text-center pt-6 pb-4">
        <h1 className="text-3xl font-bold">Films Populaires</h1>
      </div>

      {error ? <div className="p-6 text-red-400">Erreur : {error}</div> : null}

      {loading ? (
        <div className="p-6 text-gray-300">Chargement…</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6 place-items-center">
          {items.map((m) => (
            <MediaCard key={m.id} item={m} type="movie" />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
