import { NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';

function NavItem({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          'hover:text-yellow-300 transition ' + (isActive ? 'text-yellow-400' : '')
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export default function Header({ mobileOpen, onToggleMobile, showSearch = true, onSelectResult }) {
  return (
    <header className="bg-black text-white fixed w-full z-50">
      <div className="flex items-center justify-between p-4 h-20">
        <Link to="/" aria-label="Accueil">
          <h1 style={{ fontFamily: 'Cinzel Decorative, serif' }} className="text-3xl">
            <span className="text-yellow-500 font-bold">Z</span>inema
          </h1>
        </Link>

        <button onClick={onToggleMobile} className="md:hidden z-50" aria-label="Menu">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>

        <nav className="hidden md:flex ml-10">
          <ul className="flex gap-6 text-xl">
            <NavItem to="/">Accueil</NavItem>
            <NavItem to="/movies">Films</NavItem>
            <NavItem to="/series">Séries</NavItem>
            <NavItem to="/favorites">Favoris</NavItem>
          </ul>
        </nav>

        {showSearch ? (
          <div className="hidden md:flex items-center ml-auto relative">
            <SearchBar onSelectResult={onSelectResult} />
          </div>
        ) : (
          <div className="hidden md:block ml-auto" />
        )}
      </div>
    </header>
  );
}
