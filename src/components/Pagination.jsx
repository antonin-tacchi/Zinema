import { useEffect, useState } from "react";

function buildPageItems(current, total, maxButtons = 7) {
  if (total <= 1) return [1];

  const items = [];
  const clamp = (n) => Math.max(1, Math.min(total, n));

  const first = 1;
  const last = total;

  const half = Math.floor((maxButtons - 3) / 2);
  let start = clamp(current - half);
  let end = clamp(current + half);

  const desiredWindow = maxButtons - 2;
  const windowSize = end - start + 1;

  if (windowSize < desiredWindow) {
    const missing = desiredWindow - windowSize;
    if (start === first) end = clamp(end + missing);
    else if (end === last) start = clamp(start - missing);
  }

  items.push(first);

  if (start > first + 1) items.push("...");

  for (let p = start; p <= end; p++) {
    if (p !== first && p !== last) items.push(p);
  }

  if (end < last - 1) items.push("...");

  if (last !== first) items.push(last);

  return items.filter((v, i) => i === 0 || v !== items[i - 1]);
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  maxButtons = 7,
}) {
  const isMobile = useIsMobile(640);

  if (totalPages <= 1) return null;

  if (isMobile) {
    return (
      <div className="flex justify-center pb-6 px-4">
        <div className="flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl ring-1 ring-inset ring-gray-700">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page <= 1}
            className="px-3 py-2 rounded-lg bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
            aria-label="Page précédente"
          >
            ‹
          </button>

          <span className="text-sm text-gray-200 whitespace-nowrap">
            <strong className="text-white">{page}</strong> / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
            className="px-3 py-2 rounded-lg bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
            aria-label="Page suivante"
          >
            ›
          </button>
        </div>
      </div>
    );
  }

  const items = buildPageItems(page, totalPages, maxButtons);

  return (
    <div className="flex justify-center pb-6 px-4">
      <div className="inline-flex items-center gap-2 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-2 rounded-lg bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
        >
          Prev
        </button>

        {items.map((it, idx) => {
          if (it === "...") {
            return (
              <span key={`dots-${idx}`} className="px-2 text-gray-400">
                …
              </span>
            );
          }

          const p = it;
          const active = p === page;

          return (
            <button
              type="button"
              key={p}
              onClick={() => onPageChange(p)}
              className={
                "px-3 py-2 rounded-lg ring-1 ring-inset " +
                (active
                  ? "bg-yellow-500 text-black ring-yellow-400"
                  : "bg-black/60 hover:bg-black ring-gray-700")
              }
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="px-3 py-2 rounded-lg bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
