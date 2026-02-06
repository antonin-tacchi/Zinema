import { useMemo, useState } from 'react';

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function keyFor(id, type) {
  return `user_reviews_${type}_${id}`;
}

function readLocal(id, type) {
  try {
    const raw = localStorage.getItem(keyFor(id, type));
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function writeLocal(id, type, list) {
  localStorage.setItem(keyFor(id, type), JSON.stringify(list));
}

function Stars({ value = 0 }) {
  const starCount = Math.round(value / 2);
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-lg">{i < starCount ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

function Truncated({ text, max = 150 }) {
  const [expanded, setExpanded] = useState(false);
  const short = useMemo(() => text.slice(0, max) + '...', [text, max]);
  const canTruncate = text && text.length > max;

  return (
    <div>
      <p className="text-sm mt-2 whitespace-pre-wrap">
        {canTruncate ? (expanded ? text : short) : text}
      </p>
      {canTruncate ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-yellow-400 hover:text-yellow-300 mt-1"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>
      ) : null}
    </div>
  );
}

export default function Reviews({ mediaId, mediaType, apiReviews = [] }) {
  const [local, setLocal] = useState(() => readLocal(mediaId, mediaType));

  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [stars, setStars] = useState(0); // 0..5

  const rating10 = clamp(stars * 2, 0, 10);

  const add = (e) => {
    e.preventDefault();
    const a = author.trim();
    const c = content.trim();
    if (!a || !c) return;

    const next = [
      {
        author: a,
        content: c,
        rating: rating10,
        created_at: new Date().toISOString(),
      },
      ...local,
    ];

    writeLocal(mediaId, mediaType, next);
    setLocal(next);
    setAuthor('');
    setContent('');
    setStars(0);
  };

  const del = (index) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
    const next = local.filter((_, i) => i !== index);
    writeLocal(mediaId, mediaType, next);
    setLocal(next);
  };

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-gray-900 rounded-xl p-6 text-white shadow-md">
      <h3 className="text-2xl font-bold mb-4">Avis</h3>

      {/* API reviews */}
      {Array.isArray(apiReviews) && apiReviews.length > 0 ? (
        <>
          <h4 className="text-xl font-semibold mb-3 text-gray-300">Avis des utilisateurs</h4>
          {apiReviews.map((review) => (
            <div key={review.id} className="mb-4 border-b border-gray-700 pb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-yellow-300">Auteur: {review.author}</p>
                {review.author_details?.rating ? <Stars value={review.author_details.rating} /> : null}
              </div>
              <Truncated text={review.content || ''} />
            </div>
          ))}
        </>
      ) : (
        <p className="text-gray-400 mb-4">Aucun avis disponible</p>
      )}

      <hr className="my-6 border-gray-700" />

      {/* Local reviews */}
      {local.length > 0 ? (
        <>
          <h4 className="text-xl font-semibold mb-3 text-gray-300">Vos avis</h4>
          {local.map((review, index) => (
            <div key={index} className="mb-4 border-b border-gray-700 pb-4 relative">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-yellow-300">Auteur: {review.author}</p>
                {review.rating ? <Stars value={review.rating} /> : null}
              </div>
              <Truncated text={review.content || ''} />
              {review.created_at ? (
                <p className="text-xs text-gray-500 mt-2">
                  Publié le {new Date(review.created_at).toLocaleDateString()}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => del(index)}
                className="absolute top-10 right-0 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center"
                title="Supprimer cet avis"
              >
                ×
              </button>
            </div>
          ))}
        </>
      ) : null}

      <h4 className="text-xl font-semibold my-4 text-gray-300">Ajouté votre avis</h4>

      <form onSubmit={add} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Votre nom :</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Votre avis :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-gray-800 text-white rounded p-2 border border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Note :</label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => {
              const idx = i + 1;
              const active = idx <= stars;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setStars(idx)}
                  className="text-2xl leading-none"
                  aria-label={`Mettre ${idx} étoiles`}
                >
                  <span className={active ? 'text-yellow-400' : 'text-gray-600'}>{active ? '★' : '☆'}</span>
                </button>
              );
            })}
            <span className="text-sm text-gray-300 self-center ml-2">{rating10}/10</span>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
        >
          Publier
        </button>
      </form>
    </div>
  );
}
