/**
 * Modal
 * Simple overlay modal with click-outside-to-close behaviour.
 */
export default function Modal({ open, onClose, children, dark }) {
  if (!open) return null;

  const bg = dark
    ? 'bg-[#0d1b2e] border-slate-700'
    : 'bg-white border-slate-200';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <div
        className={`border rounded-2xl shadow-2xl w-full max-w-md p-6 ${bg}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
