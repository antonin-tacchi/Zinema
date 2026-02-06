import { useEffect, useMemo, useState } from 'react';
import { getPopularMovies, getPopularSeries, img } from '../services/tmdb.js';
import Carousel from '../components/Carousel.jsx';
import AdBanner from "../components/AdBanner.jsx";
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hero rotation
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const [m, s] = await Promise.all([getPopularMovies(1), getPopularSeries(1)]);
        if (!alive) return;
        setMovies((m?.results || []).slice(0, 20));
        setSeries((s?.results || []).slice(0, 20));
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
  }, []);

  const heroMovie = movies[heroIndex] || movies[0];
  const heroBg = useMemo(() => {
    const path = heroMovie?.backdrop_path || heroMovie?.poster_path;
    return path ? `url('${img(path).replace('/w500', '/original')}')` : "url('/assets/img/bg.png')";
  }, [heroMovie]);

  useEffect(() => {
    if (!movies.length) return;
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % movies.length);
    }, 10000);
    return () => clearInterval(t);
  }, [movies.length]);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative w-full h-[100vh] bg-cover bg-center text-white flex items-center transition-all duration-1000"
        style={{ backgroundImage: heroBg }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-left px-8">
          <Link
            to={heroMovie ? `/details?id=${heroMovie.id}&type=movie` : '/movies'}
            className="block"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {heroMovie?.title || heroMovie?.name || 'Zinema'}
            </h1>
          </Link>
          <p className="max-w-xl text-gray-200">
            Pop-corn non inclus. Mais les films oui.
          </p>
        </div>
      </section>

      <div className="pt-6">
        {error ? <div className="p-6 text-red-400">Erreur : {error}</div> : null}

        {loading ? (
          <div className="p-6 text-gray-300">Chargement…</div>
        ) : (
          <>
            <Carousel title="Films populaires" items={movies.slice(0, 12)} type="movie" />
            <AdBanner />
            <Carousel title="Séries populaires" items={series.slice(0, 12)} type="tv" />
          </>
        )}
      </div>
    </div>
  );
}
