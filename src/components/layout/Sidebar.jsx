import { TABS } from '../../data/constants';

/**
 * Sidebar
 * Left navigation panel — visible on md+ screens.
 */
export default function Sidebar({ tab, setTab, role, setRole, dark, setDark, theme }) {
  const { sidebar, bdr, txt2, hov, navAct, inp } = theme;

  return (
    <aside className={`hidden md:flex flex-col w-56 shrink-0 border-r ${sidebar}`}>
      {/* Logo */}
      <div className={`p-5 border-b ${bdr}`}>
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold"
            style={{ background: 'linear-gradient(135deg,#10b981,#06b6d4)' }}
          >
            ₣
          </div>
          <span className="font-semibold tracking-tight">FinTrack</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-0.5">
        {TABS.map((n) => (
          <button
            key={n.id}
            onClick={() => setTab(n.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === n.id ? navAct : `${txt2} ${hov}`
            }`}
          >
            <span>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>

      {/* Footer controls */}
      <div className={`p-4 border-t ${bdr} space-y-4`}>
        {/* Role selector */}
        <div>
          <p className={`text-xs font-medium uppercase tracking-wider mb-1.5 ${txt2}`}>Role</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full text-sm rounded-lg px-2.5 py-1.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        {/* Dark mode toggle */}
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium ${txt2}`}>Dark mode</span>
          <button
            onClick={() => setDark((d) => !d)}
            className="relative rounded-full transition-colors"
            style={{ width: 40, height: 22, background: dark ? '#059669' : '#cbd5e1' }}
          >
            <span
              className="absolute top-0.5 left-0.5 bg-white rounded-full shadow transition-transform"
              style={{ width: 18, height: 18, transform: dark ? 'translateX(18px)' : 'translateX(0)' }}
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
