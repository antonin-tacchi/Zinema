import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';

import Home from './pages/Home.jsx';
import Movies from './pages/Movies.jsx';
import Series from './pages/Series.jsx';
import Favorites from './pages/Favorites.jsx';
import Details from './pages/Details.jsx';
import NotFound from './pages/NotFound.jsx';
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import LegalNotice from "./pages/LegalNotice.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/details" element={<Details />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/legal-notice" element={<LegalNotice />} />

        {/* compat anciens liens */}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/pages/movies.html" element={<Navigate to="/movies" replace />} />
        <Route path="/pages/series.html" element={<Navigate to="/series" replace />} />
        <Route path="/pages/favorites.html" element={<Navigate to="/favorites" replace />} />
        <Route path="/pages/details.html" element={<Navigate to="/details" replace />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
