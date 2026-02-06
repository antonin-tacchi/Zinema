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

  // first
  items.push(first);

  // left ellipsis
  if (start > first + 1) items.push('...');

  for (let p = start; p <= end; p++) {
    if (p !== first && p !== last) items.push(p);
  }

  // right ellipsis
  if (end < last - 1) items.push('...');

  if (last !== first) items.push(last);

  // cleanup duplicates
  return items.filter((v, i) => i === 0 || v !== items[i - 1]);
}

export default function Pagination({ page, totalPages, onPageChange, maxButtons = 7 }) {
  const items = buildPageItems(page, totalPages, maxButtons);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center pb-6">
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="px-3 py-2 rounded-lg bg-black/60 hover:bg-black ring-1 ring-inset ring-gray-700 disabled:opacity-40"
        >
          Prev
        </button>

        {items.map((it, idx) => {
          if (it === '...') {
            return (
              <span key={`dots-${idx}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }
          const p = it;
          const active = p === page;
          return (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={
                'px-3 py-2 rounded-lg ring-1 ring-inset ' +
                (active
                  ? 'bg-yellow-500 text-black ring-yellow-400'
                  : 'bg-black/60 hover:bg-black ring-gray-700')
              }
            >
              {p}
            </button>
          );
        })}

        <button
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
