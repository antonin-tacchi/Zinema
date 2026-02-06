const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function getApiKey() {
  const fromEnv = import.meta.env.VITE_TMDB_API_KEY;
  if (fromEnv) return fromEnv;

  return '8c4b867188ee47a1d4e40854b27391ec';
}

function getLanguage() {
  return import.meta.env.VITE_TMDB_LANGUAGE || 'fr-FR';
}

async function tmdbFetch(path, params = {}) {
  const api_key = getApiKey();
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', api_key);
  url.searchParams.set('language', getLanguage());
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    url.searchParams.set(k, String(v));
  });

  const res = await fetch(url);
  if (!res.ok) {
    let msg = `TMDB error ${res.status}`;
    try {
      const data = await res.json();
      msg = data?.status_message || msg;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

export function img(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${IMAGE_BASE_URL}${path}`;
}

export async function getPopularMovies(page = 1) {
  return tmdbFetch('/movie/popular', { page });
}

export async function getPopularSeries(page = 1) {
  return tmdbFetch('/tv/popular', { page });
}

export async function getMovieDetails(id) {
  return tmdbFetch(`/movie/${id}`, {});
}

export async function getSeriesDetails(id) {
  return tmdbFetch(`/tv/${id}`, {});
}

export async function getMovieReviews(id, page = 1) {
  return tmdbFetch(`/movie/${id}/reviews`, { page });
}

export async function getSeriesReviews(id, page = 1) {
  return tmdbFetch(`/tv/${id}/reviews`, { page });
}

export async function getRecommendations(type, id, page = 1) {
  const path = type === 'tv' ? `/tv/${id}/recommendations` : `/movie/${id}/recommendations`;
  return tmdbFetch(path, { page });
}

export async function searchMulti(query, page = 1) {
  return tmdbFetch('/search/multi', { query, page, include_adult: false });
}

export async function getTrailerKey(type, id) {
  const path = type === 'tv' ? `/tv/${id}/videos` : `/movie/${id}/videos`;
  const data = await tmdbFetch(path, {});
  const list = data?.results || [];

  const trailer =
    list.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
    list.find((v) => v.site === 'YouTube' && (v.type === 'Teaser' || v.type === 'Clip')) ||
    list.find((v) => v.site === 'YouTube');

  return trailer?.key || null;
}

export async function getWatchProvidersFR(type, id) {
  const path = type === 'tv' ? `/tv/${id}/watch/providers` : `/movie/${id}/watch/providers`;
  const api_key = getApiKey();
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', api_key);

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  const fr = data?.results?.FR;

  if (!fr) return [];

  const all = [
    ...(fr.flatrate || []),
    ...(fr.rent || []),
    ...(fr.buy || []),
  ];

  const map = new Map();
  for (const p of all) map.set(p.provider_id, p);

  return Array.from(map.values());
}
