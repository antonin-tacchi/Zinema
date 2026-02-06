import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-300 mt-2">Cette page a disparu… probablement partie chercher du pop-corn.</p>
      <Link
        to="/"
        className="inline-block mt-6 px-4 py-2 rounded-full bg-yellow-500 text-black font-semibold hover:bg-yellow-400"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
