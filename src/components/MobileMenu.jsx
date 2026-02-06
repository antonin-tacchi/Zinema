  import { NavLink } from 'react-router-dom';
  import SearchBar from './SearchBar.jsx';

  function NavItem({ to, children, onClick }) {
    return (
      <li>
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            'block py-1 ' + (isActive ? 'text-yellow-400' : 'text-white')
          }
        >
          {children}
        </NavLink>
      </li>
    );
  }

  export default function MobileMenu({ open, onClose, onSelectResult }) {
    return (
      <>
        <div
          onClick={onClose}
          className={'fixed inset-0 bg-black/50 z-40 ' + (open ? 'block' : 'hidden')}
        />

        <nav
          className={
            'fixed top-0 right-0 h-full w-64 bg-black text-white transform transition-transform duration-300 z-50 md:hidden p-6 ' +
            (open ? 'translate-x-0' : 'translate-x-full')
          }
        >
          <ul className="flex flex-col gap-6 text-xl mb-6 pt-16">
            <NavItem to="/" onClick={onClose}>Accueil</NavItem>
            <NavItem to="/movies" onClick={onClose}>Films</NavItem>
            <NavItem to="/series" onClick={onClose}>Séries</NavItem>
            <NavItem to="/favorites" onClick={onClose}>Favoris</NavItem>
          </ul>

          <div className="mb-6 relative">
            <SearchBar placeholder="Rechercher un film ou une série" className='w-full' onSelectResult={(r) => {
              onClose?.();
              onSelectResult?.(r);
            }} />
          </div>
        </nav>
      </>
    );
  }
