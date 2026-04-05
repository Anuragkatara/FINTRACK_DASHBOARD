import { CAT_ICONS } from '../../data/constants';
import { fmt, fmtFull } from '../../utils/helpers';

/**
 * Insights Tab
 * Shows category breakdown bars, monthly comparison table, KPI cards, and key observations.
 * monthlyData: array of { label, yearMonth, income, expense } — dynamic, last ≤6 months.
 */
export default function Insights({
  catBreakdown, monthlyData,
  totalIncome, totalExpense, balance, savingsRate,
  txns, dark, theme,
}) {
  const { card, card2, bdr, txt, txt2, txt3 } = theme;

  const topCat = catBreakdown[0];

  // Use last two months that have data for comparison
  const lastTwo   = monthlyData.slice(-2);
  const prevMonth = lastTwo[0];
  const currMonth = lastTwo[1];

  const expChange =
    prevMonth?.expense > 0 && currMonth
      ? (((currMonth.expense - prevMonth.expense) / prevMonth.expense) * 100).toFixed(1)
      : 0;

  const compLabel = prevMonth && currMonth
    ? `${prevMonth.label} → ${currMonth.label}`
    : 'Monthly comparison';

  const kpiCards = [
    {
      title: 'Top Spending',
      icon:  '🏆',
      value: topCat?.cat || '—',
      sub:   topCat ? `${fmtFull(topCat.value)} — ${topCat.pct}%` : 'No data',
    },
    {
      title: 'Expense Change',
      icon:  +expChange > 0 ? '📈' : '📉',
      value: `${+expChange > 0 ? '+' : ''}${expChange}%`,
      sub:   compLabel,
    },
    {
      title: 'Savings Rate',
      icon:  '💰',
      value: `${savingsRate}%`,
      sub:   `${fmt(balance)} saved overall`,
    },
  ];

  const observations = [
    {
      icon: topCat?.pct > 30 ? '⚠️' : '✅',
      text: topCat
        ? `${topCat.cat} is your top expense category at ${topCat.pct}% of total spending.`
        : 'No expense data yet.',
    },
    {
      icon: +savingsRate >= 20 ? '✅' : '⚠️',
      text: `Savings rate is ${savingsRate}%. ${
        +savingsRate >= 20 ? 'Great job maintaining healthy finances!' : 'Consider reducing expenses to improve savings.'
      }`,
    },
    {
      icon: +expChange > 0 ? '📈' : '📉',
      text: currMonth && prevMonth
        ? `Expenses ${+expChange > 0 ? 'increased' : 'decreased'} by ${Math.abs(expChange)}% from ${prevMonth.label} to ${currMonth.label}.`
        : 'Not enough monthly data for comparison yet.',
    },
    {
      icon: '💡',
      text: `${txns.filter((t) => t.type === 'income').length} income entries and ${
        txns.filter((t) => t.type === 'expense').length
      } expense entries tracked across ${monthlyData.length} month${monthlyData.length !== 1 ? 's' : ''}.`,
    },
    {
      icon: totalExpense > totalIncome ? '🚨' : '✅',
      text: totalExpense > totalIncome
        ? `Warning: total expenses (${fmt(totalExpense)}) exceed total income (${fmt(totalIncome)}).`
        : `You are in the green — total income exceeds expenses by ${fmt(balance)}.`,
    },
  ];

  return (
    <>
      {/* ── KPI Cards ── */}
      <div className="grid md:grid-cols-3 gap-4">
        {kpiCards.map((c, i) => (
          <div key={i} className={`rounded-2xl p-5 border ${card}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <p className={`text-xs font-medium mb-1 ${txt2}`}>{c.title}</p>
                <p className={`text-2xl font-bold tracking-tight ${txt}`}>{c.value}</p>
                <p className={`text-xs mt-1 ${txt2}`}>{c.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Category Bar Chart ── */}
      <div className={`rounded-2xl border overflow-hidden ${card}`}>
        <div className={`px-5 py-4 border-b ${bdr}`}>
          <h3 className={`text-sm font-semibold ${txt3}`}>Spending by Category</h3>
          {catBreakdown.length === 0 && (
            <p className={`text-xs mt-1 ${txt2}`}>No expense data yet.</p>
          )}
        </div>
        <div className="p-5 space-y-4">
          {catBreakdown.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-3xl mb-2">📊</p>
              <p className={`text-sm ${txt2}`}>Add some expense transactions to see breakdown</p>
            </div>
          ) : (
            catBreakdown.map((c, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{CAT_ICONS[c.cat] || '📦'}</span>
                    <span className={`text-sm font-medium ${txt3}`}>{c.cat}</span>
                  </div>
                  <div>
                    <span className={`text-sm font-bold ${txt}`}>{fmtFull(c.value)}</span>
                    <span className={`text-xs ml-2 ${txt2}`}>{c.pct}%</span>
                  </div>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.pct}%`, background: c.color, transition: 'width 0.7s ease' }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Monthly Comparison ── */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <h3 className={`text-sm font-semibold mb-4 ${txt3}`}>Monthly Comparison</h3>
        {monthlyData.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-3xl mb-2">📅</p>
            <p className={`text-sm ${txt2}`}>No monthly data available</p>
          </div>
        ) : (
          <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${Math.min(monthlyData.length, 3)}, 1fr)` }}>
            {monthlyData.map((m, i) => (
              <div key={i} className={`rounded-xl p-4 border ${card2}`}>
                <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${txt2}`}>{m.label}</p>
                <p className={`text-xs mb-0.5 ${txt2}`}>Income</p>
                <p className="text-sm font-bold text-emerald-500 mb-2">{fmt(m.income)}</p>
                <p className={`text-xs mb-0.5 ${txt2}`}>Expenses</p>
                <p className="text-sm font-bold text-rose-500 mb-2">{fmt(m.expense)}</p>
                <div className={`border-t pt-2 ${bdr}`}>
                  <p className={`text-xs mb-0.5 ${txt2}`}>Net</p>
                  <p
                    className={`text-sm font-bold ${
                      m.income - m.expense >= 0 ? 'text-cyan-400' : 'text-rose-500'
                    }`}
                  >
                    {fmt(m.income - m.expense)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Key Observations ── */}
      <div className={`rounded-2xl border p-5 ${card}`}>
        <h3 className={`text-sm font-semibold mb-4 ${txt3}`}>Key Observations</h3>
        <div className="space-y-3">
          {observations.map((obs, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-xl ${
                dark ? 'bg-slate-800/60' : 'bg-slate-50'
              }`}
            >
              <span className="text-lg">{obs.icon}</span>
              <p className={`text-sm leading-relaxed ${txt2}`}>{obs.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
