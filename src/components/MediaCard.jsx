import { Link } from 'react-router-dom';
import StarButton from './StarButton.jsx';
import { img } from '../services/tmdb.js';

export default function MediaCard({ item, type }) {
  const title = type === 'tv' ? item.name : item.title;
  const date = type === 'tv' ? item.first_air_date : item.release_date;
  const year = date ? new Date(date).getFullYear() : '';
  const rating = item.vote_average ? Number(item.vote_average).toFixed(1) : null;
  const href = `/details?id=${item.id}&type=${type}`;

  return (
    <Link
      to={href}
      className="relative block w-[240px] shrink-0 mb-4 cursor-pointer transition-all duration-300 hover:scale-105"
    >
      <StarButton id={item.id} type={type} />

      {rating ? (
        <span className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs ring-1 ring-inset ring-yellow-600/50 bg-black/60 text-yellow-300">
          {rating}
        </span>
      ) : null}

      <img
        src={img(item.poster_path) || '/assets/img/bg.png'}
        alt={title || 'Poster'}
        className="w-full h-[310px] object-cover rounded-lg shadow-lg"
        loading="lazy"
      />

      <p className="text-white text-center mt-2 text-sm font-medium line-clamp-2 leading-snug">
        {title}
      </p>
      <p className="text-gray-400 text-center text-xs">{year}</p>
    </Link>
  );
}
