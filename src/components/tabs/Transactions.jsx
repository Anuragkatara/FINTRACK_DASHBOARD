import { useState } from 'react';
import { CAT_ICONS } from '../../data/constants';
import { fmtFull }   from '../../utils/helpers';

export default function Transactions({
  filtered, allCats,
  search,     setSearch,
  fType,      setFType,
  fCat,       setFCat,
  fDateFrom,  setFDateFrom,
  fDateTo,    setFDateTo,
  sortCol, sortDir, sortBy,
  isAdmin, onEdit, onDelete,
  dark, theme,
}) {
  const { card, bdr, txt, txt2, inp, hov } = theme;
  const [showFilters, setShowFilters] = useState(false);

  const COLUMNS = [
    ['date',     'Date'],
    ['desc',     'Description'],
    ['category', 'Category'],
    ['type',     'Type'],
    ['amount',   'Amount'],
  ];

  // Count how many filters are active
  const activeFilterCount =
    (fType !== 'all' ? 1 : 0) +
    (fCat  !== 'all' ? 1 : 0) +
    (fDateFrom      ? 1 : 0) +
    (fDateTo        ? 1 : 0);

  const clearAll = () => {
    setSearch('');
    setFType('all');
    setFCat('all');
    setFDateFrom('');
    setFDateTo('');
  };

  const hasAnyFilter = search || fType !== 'all' || fCat !== 'all' || fDateFrom || fDateTo;

  return (
    <>
      {/* ── Search + Filter Bar ── */}
      <div className={`rounded-2xl border ${card}`}>

        {/* Top row: search + filter toggle */}
        <div className="flex items-center gap-3 p-4">
          {/* Search input */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or category..."
              className={`w-full text-sm rounded-xl pl-9 pr-4 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Filter toggle button */}
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              showFilters || activeFilterCount > 0
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : dark
                ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
                : 'border-slate-300 text-gray-500 hover:bg-slate-100'
            }`}
          >
            <span>⚙ Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-white text-emerald-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Clear all button */}
          {hasAnyFilter && (
            <button
              onClick={clearAll}
              className={`px-3 py-2.5 rounded-xl text-sm border transition-colors ${
                dark
                  ? 'border-rose-800 text-rose-400 hover:bg-rose-900/30'
                  : 'border-rose-200 text-rose-500 hover:bg-rose-50'
              }`}
            >
              ✕ Clear
            </button>
          )}
        </div>

        {/* Expandable filter panel */}
        {showFilters && (
          <div className={`px-4 pb-4 pt-0 border-t ${bdr}`}>
            <div className="flex flex-wrap gap-4 pt-4">

              {/* Type filter */}
              <div>
                <p className={`text-xs font-medium mb-2 ${txt2}`}>Type</p>
                <div className="flex gap-1.5">
                  {[
                    { val: 'all',     label: 'All'        },
                    { val: 'income',  label: '↑ Income'   },
                    { val: 'expense', label: '↓ Expense'  },
                  ].map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setFType(val)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all ${
                        fType === val
                          ? val === 'income'
                            ? 'bg-emerald-600 border-emerald-500 text-white'
                            : val === 'expense'
                            ? 'bg-rose-600 border-rose-500 text-white'
                            : 'bg-slate-600 border-slate-500 text-white'
                          : dark
                          ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
                          : 'border-slate-300 text-gray-500 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`hidden md:block w-px self-stretch ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />

              {/* Category filter */}
              <div>
                <p className={`text-xs font-medium mb-2 ${txt2}`}>Category</p>
                <select
                  value={fCat}
                  onChange={(e) => setFCat(e.target.value)}
                  className={`text-sm rounded-xl px-3 py-1.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
                >
                  <option value="all">All categories</option>
                  {allCats.map((c) => (
                    <option key={c} value={c}>
                      {CAT_ICONS[c] || '📦'} {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`hidden md:block w-px self-stretch ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />

              {/* Date range filter */}
              <div>
                <p className={`text-xs font-medium mb-2 ${txt2}`}>Date Range</p>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={fDateFrom}
                    onChange={(e) => setFDateFrom(e.target.value)}
                    className={`text-xs rounded-xl px-2.5 py-1.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
                  />
                  <span className={`text-xs ${txt2}`}>to</span>
                  <input
                    type="date"
                    value={fDateTo}
                    onChange={(e) => setFDateTo(e.target.value)}
                    className={`text-xs rounded-xl px-2.5 py-1.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
                  />
                </div>
              </div>

              <div className={`hidden md:block w-px self-stretch ${dark ? 'bg-slate-800' : 'bg-slate-200'}`} />

              {/* Sort shortcuts */}
              <div>
                <p className={`text-xs font-medium mb-2 ${txt2}`}>Sort by</p>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { col: 'date',   label: '📅 Date'   },
                    { col: 'amount', label: '💰 Amount' },
                  ].map(({ col, label }) => (
                    <button
                      key={col}
                      onClick={() => sortBy(col)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-all flex items-center gap-1 ${
                        sortCol === col
                          ? 'bg-indigo-600 border-indigo-500 text-white'
                          : dark
                          ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
                          : 'border-slate-300 text-gray-500 hover:bg-slate-100'
                      }`}
                    >
                      {label}
                      {sortCol === col && (
                        <span className="opacity-80">{sortDir === 'asc' ? '↑' : '↓'}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result count + active filter chips */}
        <div className={`px-4 py-2.5 border-t ${bdr} flex items-center justify-between`}>
          <p className={`text-xs ${txt2}`}>
            <span className="font-semibold text-emerald-500">{filtered.length}</span>{' '}
            result{filtered.length !== 1 ? 's' : ''}
            {hasAnyFilter && ' (filtered)'}
          </p>

          <div className="flex items-center gap-1.5 flex-wrap">
            {fType !== 'all' && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${
                  fType === 'income'
                    ? 'bg-emerald-900/50 text-emerald-400'
                    : 'bg-rose-900/40 text-rose-400'
                }`}
              >
                {fType}
                <button onClick={() => setFType('all')} className="hover:opacity-70">×</button>
              </span>
            )}
            {fCat !== 'all' && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-gray-600'}`}>
                {CAT_ICONS[fCat] || '📦'} {fCat}
                <button onClick={() => setFCat('all')} className="hover:opacity-70">×</button>
              </span>
            )}
            {(fDateFrom || fDateTo) && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-gray-600'}`}>
                📅 {fDateFrom || '…'} → {fDateTo || '…'}
                <button onClick={() => { setFDateFrom(''); setFDateTo(''); }} className="hover:opacity-70">×</button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className={`rounded-2xl border overflow-hidden ${card}`}>
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <p className={`text-sm ${txt2}`}>No transactions found</p>
            {hasAnyFilter && (
              <button
                onClick={clearAll}
                className="mt-3 text-xs text-emerald-500 hover:text-emerald-400 underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${bdr}`}>
                  {COLUMNS.map(([col, label]) => (
                    <th
                      key={col}
                      onClick={() => sortBy(col)}
                      className={`text-left px-4 py-3 text-xs font-medium uppercase tracking-wide cursor-pointer select-none whitespace-nowrap transition-colors ${
                        sortCol === col
                          ? 'text-emerald-400'
                          : `${txt2} hover:text-emerald-400`
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        {sortCol === col ? (
                          <span className="text-emerald-400">{sortDir === 'asc' ? '↑' : '↓'}</span>
                        ) : (
                          <span className="opacity-20">↕</span>
                        )}
                      </span>
                    </th>
                  ))}
                  {isAdmin && (
                    <th className={`px-4 py-3 text-xs font-medium uppercase tracking-wide text-right ${txt2}`}>
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filtered.map((tx) => (
                  <tr key={tx.id} className={`border-b ${bdr} transition-colors ${hov} group`}>
                    {/* Date */}
                    <td className={`px-4 py-3 text-xs whitespace-nowrap ${txt2}`}>{tx.date}</td>

                    {/* Description + icon */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{CAT_ICONS[tx.category] || '📦'}</span>
                        <span className={`text-sm font-medium ${txt}`}>{tx.desc}</span>
                      </div>
                    </td>

                    {/* Category badge — click to filter */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setFCat(tx.category); setShowFilters(true); }}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                          dark
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                        }`}
                      >
                        {tx.category}
                      </button>
                    </td>

                    {/* Type badge — click to filter */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => { setFType(tx.type); setShowFilters(true); }}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-colors ${
                          tx.type === 'income'
                            ? dark ? 'bg-emerald-900/50 text-emerald-400 hover:bg-emerald-900' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : dark ? 'bg-rose-900/40 text-rose-400 hover:bg-rose-900/60'       : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {tx.type}
                      </button>
                    </td>

                    {/* Amount */}
                    <td
                      className={`px-4 py-3 text-sm font-bold whitespace-nowrap ${
                        tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                      }`}
                    >
                      {tx.type === 'income' ? '+' : '-'}{fmtFull(tx.amount)}
                    </td>

                    {/* Edit / Delete (admin only) */}
                    {isAdmin && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => onEdit(tx)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                              dark
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                            }`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(tx.id)}
                            className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                              dark
                                ? 'bg-rose-900/50 text-rose-400 hover:bg-rose-900'
                                : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            }`}
                          >
                            Del
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}