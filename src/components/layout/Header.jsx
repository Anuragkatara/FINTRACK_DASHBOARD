
export default function Header({ tab, role, setRole, dark, setDark, isAdmin, onAdd, onExport, theme }) {
  const { header, bdr, txt, txt2, inp } = theme;

  return (
    <header
      className={`sticky top-0 z-30 border-b ${header} px-5 py-3 flex items-center justify-between`}
      style={{ backdropFilter: 'blur(8px)' }}
    >
      
      <div>
        <h1 className={`text-base font-semibold capitalize ${txt}`}>{tab}</h1>
        <p className={`text-xs ${txt2}`}>
          {isAdmin ? 'Admin — full access' : 'Viewer — read only'}
        </p>
      </div>

 
      <div className="flex items-center gap-2">
       
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`md:hidden text-xs rounded-lg px-2 py-1.5 border focus:outline-none ${inp}`}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={() => setDark((d) => !d)}
          className={`md:hidden p-2 rounded-lg text-sm ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          {dark ? '☀️' : '🌙'}
        </button>
        <button
          onClick={onExport}
          className={`text-xs px-3 py-2 rounded-xl border transition-colors ${
            dark
              ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
              : 'border-slate-300 text-gray-500 hover:bg-slate-100'
          }`}
        >
          ↓ CSV
        </button>

        {isAdmin && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add
          </button>
        )}
      </div>
    </header>
  );
}
