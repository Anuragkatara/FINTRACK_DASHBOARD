import { useEffect } from 'react';

/**
 * Toast
 * Auto-dismissing success notification shown at bottom-right.
 */
export default function Toast({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-xl">
      {msg}
    </div>
  );
}
