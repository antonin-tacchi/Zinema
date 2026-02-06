import { useEffect, useMemo, useState } from 'react';
import { searchMulti } from '../services/tmdb.js';
import { debounce } from '../utils/debounce.js';

function normalizeType(item) {
  // TMDB returns: movie, tv, person, etc.
  if (item.media_type === 'movie') return 'movie';
  if (item.media_type === 'tv') return 'tv';
  return null;
}

export default function SearchBar({ placeholder = 'Rechercher un film ou une série', onSelectResult }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const runSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query || query.trim().length < 2) {
          setResults([]);
          setError('');
          setLoading(false);
          return;
        }

        try {
          setLoading(true);
          setError('');
          const data = await searchMulti(query.trim(), 1);
          const filtered = (data?.results || [])
            .filter((it) => normalizeType(it))
            .slice(0, 7);
          setResults(filtered);
        } catch (e) {
          setError(e?.message || 'Erreur recherche');
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 250),
    []
  );

  useEffect(() => {
    runSearch(q);
  }, [q, runSearch]);

  const pickTitle = (it) => (it.media_type === 'tv' ? it.name : it.title);

  return (
    <div className="relative">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // petit délai pour laisser le click sur un résultat
          setTimeout(() => setOpen(false), 120);
        }}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        className="p-2 pl-5 rounded-full bg-gray-700 text-white w-72"
      />

      {open && (q.trim().length >= 2) ? (
        <div className="absolute mt-2 w-full rounded-xl bg-gray-900/95 ring-1 ring-inset ring-gray-700 shadow-soft overflow-hidden z-50">
          {loading ? (
            <div className="p-3 text-sm text-gray-300">Recherche…</div>
          ) : error ? (
            <div className="p-3 text-sm text-red-400">{error}</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-sm text-gray-400">Rien trouvé.</div>
          ) : (
            <ul className="divide-y divide-gray-800">
              {results.map((it) => {
                const type = normalizeType(it);
                const title = pickTitle(it);
                return (
                  <li key={`${type}-${it.id}`}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        setQ('');
                        setOpen(false);
                        onSelectResult?.({ id: it.id, type });
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-800 flex items-center gap-2"
                    >
                      <span className="text-xs px-2 py-1 rounded-full bg-black/60 ring-1 ring-inset ring-gray-700 text-gray-200">
                        {type === 'tv' ? 'Série' : 'Film'}
                      </span>
                      <span className="text-sm text-white line-clamp-1">{title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
