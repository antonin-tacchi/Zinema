import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center bg-black text-white h-20 mt-10">
      <h1>
        Copyright©2025 -{' '}
        <span className="text-yellow-500 font-bold font-cinzel">Z</span>inema.
      </h1>

      <div className="flex space-x-4 text-sm text-gray-400 mt-2">
        <Link to="/legal-notice">Mentions légales</Link>
        <Link to="/privacy-policy">Politique de confidentialité</Link>
      </div>
    </footer>
  );
}
