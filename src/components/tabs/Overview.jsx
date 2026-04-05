import Sparkline      from '../charts/Sparkline';
import DonutChart     from '../charts/DonutChart';
import CashFlowChart  from '../charts/CashFlowChart';
import { CAT_ICONS }  from '../../data/constants';
import { fmt, fmtFull } from '../../utils/helpers';


export default function Overview({
  totalIncome, totalExpense, balance, savingsRate,
  monthlyData, catBreakdown, txns,
  dark, theme, setTab,
}) {
  const { card, card2, bdr, txt, txt2, txt3, hov, div } = theme;

  const summaryCards = [
    { label: 'Total Balance', value: fmt(balance),      spark: [balance * 0.8, balance * 0.9, balance], color: '#6366f1' },
    { label: 'Total Income',  value: fmt(totalIncome),  spark: monthlyData.map((m) => m.income),         color: '#10b981' },
    { label: 'Total Expense', value: fmt(totalExpense), spark: monthlyData.map((m) => m.expense),        color: '#f43f5e' },
    { label: 'Savings Rate',  value: `${savingsRate}%`, spark: [45, 50, +savingsRate],                   color: '#06b6d4' },
  ];

  return (
    <>
    
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {summaryCards.map((c, i) => (
          <div key={i} className={`rounded-2xl p-4 border ${card}`}>
            <p className={`text-xs font-medium mb-2 ${txt2}`}>{c.label}</p>
            <p className={`text-xl font-bold tracking-tight ${txt}`}>{c.value}</p>
            <div className="flex justify-end mt-2">
              <Sparkline data={c.spark} color={c.color} />
            </div>
          </div>
        ))}
      </div>

     
      <div className="rounded-2xl border border-slate-800 overflow-hidden" style={{ background: '#071422' }}>
        <div className="px-5 pt-5 pb-2 flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Monthly Cash Flow</h3>
            <p className="text-xs text-slate-500 mt-0.5">Income vs Expense trend</p>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 rounded" style={{ height: 2.5, background: '#34d399' }} />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-6 rounded" style={{ height: 2, background: '#f43f5e' }} />
              Expense
            </span>
          </div>
        </div>

        <div className="w-full" style={{ height: 210 }}>
          <CashFlowChart monthlyData={monthlyData} />
        </div>

        <div className="grid grid-cols-3" style={{ borderTop: '1px solid #1e293b' }}>
          {monthlyData.map((m, i) => (
            <div
              key={i}
              className="px-4 py-3 text-center"
              style={{ borderRight: i < 2 ? '1px solid #1e293b' : 'none' }}
            >
              <p className="text-xs text-slate-500 mb-1">{m.label}</p>
              <p className="text-xs font-semibold text-emerald-400">{fmt(m.income)}</p>
              <p className="text-xs font-semibold text-rose-400">-{fmt(m.expense)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        
        <div className={`rounded-2xl p-5 border ${card}`}>
          <h3 className={`text-sm font-semibold mb-4 ${txt3}`}>Spending Breakdown</h3>
          <div className="flex items-center gap-5">
            <div className="shrink-0">
              <DonutChart
                data={catBreakdown.slice(0, 7).map((d) => ({ value: d.value, color: d.color }))}
                size={160}
              />
            </div>
            <div className="flex-1 space-y-2">
              {catBreakdown.slice(0, 6).map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className={`text-xs flex-1 truncate ${txt2}`}>{c.cat}</span>
                  <span className={`text-xs font-semibold ${txt3}`}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className={`rounded-2xl border overflow-hidden ${card}`}>
          <div className={`px-4 py-3 flex items-center justify-between border-b ${bdr}`}>
            <h3 className={`text-sm font-semibold ${txt3}`}>Recent Transactions</h3>
            <button onClick={() => setTab('transactions')} className="text-xs text-emerald-500 font-medium">
              View all →
            </button>
          </div>
          <div className={`divide-y ${div}`}>
            {txns.slice(0, 5).map((tx) => (
              <div key={tx.id} className={`flex items-center gap-3 px-4 py-3 transition-colors ${hov}`}>
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                    dark ? 'bg-slate-800' : 'bg-slate-100'
                  }`}
                >
                  {CAT_ICONS[tx.category] || '📦'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${txt}`}>{tx.desc}</p>
                  <p className={`text-xs ${txt2}`}>{tx.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {tx.type === 'income' ? '+' : '-'}{fmtFull(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
