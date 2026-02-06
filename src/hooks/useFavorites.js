import { useCallback, useEffect, useMemo, useState } from 'react';

const KEY = 'favorites';

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function write(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => read());

  // sync si plusieurs onglets
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY) setFavorites(read());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isFavorite = useCallback(
    (id, type) => favorites.some((f) => f.id === Number(id) && f.type === type),
    [favorites]
  );

  const toggle = useCallback((id, type) => {
    setFavorites((prev) => {
      const nId = Number(id);
      const exists = prev.some((f) => f.id === nId && f.type === type);
      const next = exists ? prev.filter((f) => !(f.id === nId && f.type === type)) : [...prev, { id: nId, type }];
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    write([]);
    setFavorites([]);
  }, []);

  return useMemo(
    () => ({ favorites, isFavorite, toggle, clear }),
    [favorites, isFavorite, toggle, clear]
  );
}
