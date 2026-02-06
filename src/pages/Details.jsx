import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getMovieDetails,
  getSeriesDetails,
  getMovieReviews,
  getSeriesReviews,
  getRecommendations,
  getTrailerKey,
  getWatchProvidersFR,
  img,
} from "../services/tmdb.js";
import StarButton from "../components/StarButton.jsx";
import Carousel from "../components/Carousel.jsx";
import Reviews from "../components/Reviews.jsx";
import AdBanner from "../components/AdBanner.jsx";

function badge(label) {
  return (
    <span className="px-3 py-1 rounded-full bg-black/60 ring-1 ring-inset ring-gray-700 text-sm text-gray-100">
      {label}
    </span>
  );
}

const PROVIDER_HOME_URL = {
  Netflix: "https://www.netflix.com",
  "Amazon Prime Video": "https://www.primevideo.com",
  "Disney Plus": "https://www.disneyplus.com",
  "Disney+": "https://www.disneyplus.com",
  "Apple TV Plus": "https://tv.apple.com",
  "Apple TV+": "https://tv.apple.com",
  "Canal+": "https://www.canalplus.com",
  "Paramount Plus": "https://www.paramountplus.com",
  "Paramount+": "https://www.paramountplus.com",
  OCS: "https://www.ocs.fr",
  Crunchyroll: "https://www.crunchyroll.com",
  YouTube: "https://www.youtube.com",
  "Google Play Movies": "https://play.google.com/store/movies",
  "Rakuten TV": "https://rakuten.tv",
  "Molotov TV": "https://www.molotov.tv",
  MUBI: "https://mubi.com",
  Arte: "https://www.arte.tv",
  "France TV": "https://www.france.tv",
};

function getProviderHomeUrl(providerName) {
  return PROVIDER_HOME_URL[providerName] || null;
}

export default function Details() {
  const [params] = useSearchParams();
  const id = params.get("id");
  const rawType = params.get("type");
  const type = rawType === "tv" ? "tv" : "movie";

  const [details, setDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recs, setRecs] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [providers, setProviders] = useState([]);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isTrailerOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsTrailerOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isTrailerOpen]);

  useEffect(() => {
    if (!id) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");

        const [d, r] = await Promise.all([
          type === "tv" ? getSeriesDetails(id) : getMovieDetails(id),
          type === "tv" ? getSeriesReviews(id, 1) : getMovieReviews(id, 1),
        ]);

        if (!alive) return;
        setDetails(d);
        setReviews(r?.results || []);

        try {
          const recData = await getRecommendations(type, id, 1);
          if (!alive) return;
          setRecs((recData?.results || []).slice(0, 12));
        } catch {}

        try {
          const key = await getTrailerKey(type, id);
          if (!alive) return;
          setTrailerKey(key);
        } catch {}

        try {
          const prov = await getWatchProvidersFR(type, id);
          if (!alive) return;
          setProviders(prov || []);
        } catch {}
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Erreur de chargement");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id, type]);

  const title = useMemo(() => {
    if (!details) return "";
    return type === "tv" ? details.name : details.title;
  }, [details, type]);

  const backdrop = useMemo(() => {
    const path = details?.backdrop_path || details?.poster_path;
    return path
      ? `url('${img(path).replace("/w500", "/original")}')`
      : "url('/assets/img/bg.png')";
  }, [details]);

  if (!id) {
    return <div className="p-6 text-gray-300">Aucun ID fourni.</div>;
  }

  return (
    <div>
      {error ? <div className="p-6 text-red-400">Erreur : {error}</div> : null}

      {loading ? (
        <div className="p-6 text-gray-300">Chargement…</div>
      ) : details ? (
        <>
          {/* HERO */}
          <section
            className="relative w-full bg-cover bg-center text-white"
            style={{ backgroundImage: backdrop }}
          >
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 min-h-[70vh] md:min-h-[100vh]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-0 md:h-[100vh] flex items-center">
                <div className="w-full flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-center">
                  <div className="relative inline-block">
                    <StarButton
                      id={details.id}
                      type={type}
                      className="absolute top-2 right-2 z-20"
                    />

                    <img
                      src={img(details.poster_path) || "/assets/img/bg.png"}
                      alt={title}
                      className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[260px] rounded-xl shadow-soft"
                      loading="lazy"
                    />
                  </div>


                  <div className="flex-1 w-full text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                      {title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                      {details?.release_date
                        ? badge(new Date(details.release_date).getFullYear())
                        : null}
                      {details?.first_air_date
                        ? badge(new Date(details.first_air_date).getFullYear())
                        : null}
                      {details?.runtime ? badge(`${details.runtime} min`) : null}
                      {details?.episode_run_time?.length
                        ? badge(`${details.episode_run_time[0]} min`)
                        : null}
                      {details?.vote_average
                        ? badge(`${Number(details.vote_average).toFixed(1)} / 10`)
                        : null}
                    </div>

                    {details?.genres?.length ? (
                      <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                        {details.genres.map((g) => badge(g.name))}
                      </div>
                    ) : null}

                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap mb-6 text-sm sm:text-base">
                      {details.overview || "Aucun résumé disponible."}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {trailerKey ? (
                        <button
                          onClick={() => setIsTrailerOpen(true)}
                          className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 font-semibold w-full sm:w-auto"
                        >
                          bande-annonce
                        </button>
                      ) : null}
                    </div>

                    {/* Providers */}
                    {providers.length ? (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">
                          Disponible sur
                        </h3>

                        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                          {providers.map((p) => {
                            const url = getProviderHomeUrl(p.provider_name);

                            return (
                              <a
                                key={p.provider_id}
                                href={url || "#"}
                                target="_blank"
                                rel="noreferrer"
                                className={
                                  url
                                    ? "hover:scale-110 transition"
                                    : "pointer-events-none opacity-60"
                                }
                                title={
                                  url
                                    ? `Ouvrir ${p.provider_name}`
                                    : `${p.provider_name} (lien non configuré)`
                                }
                              >
                                <img
                                  src={img(p.logo_path)}
                                  alt={p.provider_name}
                                  className="h-10 w-10 rounded-lg bg-black/30 p-1"
                                  loading="lazy"
                                />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Modal Trailer */}
          {isTrailerOpen && trailerKey ? (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setIsTrailerOpen(false);
              }}
            >
              <div className="w-full max-w-4xl rounded-xl overflow-hidden bg-black ring-1 ring-inset ring-gray-700">
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-black/70">
                  <p className="text-white font-semibold truncate">
                    {title} — Bande-annonce
                  </p>
                  <button
                    onClick={() => setIsTrailerOpen(false)}
                    className="text-white/80 hover:text-white px-3 py-1 rounded-md bg-white/10 hover:bg-white/15"
                    aria-label="Fermer"
                  >
                    ✕
                  </button>
                </div>

                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          ) : null}

          <AdBanner />

          {recs.length ? (
            <Carousel
              title={
                type === "tv"
                  ? `Séries similaires à "${title}"`
                  : `Films similaires à "${title}"`
              }
              items={recs}
              type={type}
            />
          ) : null}

          <Reviews mediaId={id} mediaType={type} apiReviews={reviews} />
        </>
      ) : (
        <div className="p-6 text-gray-300">Introuvable.</div>
      )}
    </div>
  );
}
