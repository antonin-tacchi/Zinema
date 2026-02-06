import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import MobileMenu from '../components/MobileMenu.jsx';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ferme le menu à chaque navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  const showSearch = useMemo(() => {
    // on garde la search partout (comme avant)
    return true;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((v) => !v)}
        showSearch={showSearch}
        onSelectResult={({ id, type }) => navigate(`/details?id=${id}&type=${type}`)}
      />

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSelectResult={({ id, type }) => navigate(`/details?id=${id}&type=${type}`)}
      />

      <main className="pt-20 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
