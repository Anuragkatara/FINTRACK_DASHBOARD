import { TABS } from '../../data/constants';

/**
 * MobileTabs
 * Bottom tab bar visible only on small screens.
 */
export default function MobileTabs({ tab, setTab, dark, theme }) {
  const { txt2 } = theme;

  return (
    <div
      className={`md:hidden flex border-b ${
        dark ? 'bg-[#07101e] border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors ${
            tab === t.id
              ? dark
                ? 'text-emerald-400 border-b-2 border-emerald-500'
                : 'text-emerald-600 border-b-2 border-emerald-600'
              : txt2
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
