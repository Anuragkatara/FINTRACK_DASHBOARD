import { useState, useMemo } from 'react';
import { SEED_TRANSACTIONS } from '../data/constants';
import { catColor } from '../utils/helpers';

const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/**
 * Manages all transaction state: CRUD, filters, sorting, and derived stats.
 */
export function useTransactions() {
  const [txns, setTxns] = useState(() => {
    try {
      const saved = localStorage.getItem('fin_txns');
      return saved ? JSON.parse(saved) : SEED_TRANSACTIONS;
    } catch {
      return SEED_TRANSACTIONS;
    }
  });

  const [search,  setSearch]  = useState('');
  const [fType,   setFType]   = useState('all');
  const [fCat,    setFCat]    = useState('all');
  const [fDateFrom, setFDateFrom] = useState('');
  const [fDateTo,   setFDateTo]   = useState('');
  const [sortCol, setSortCol] = useState('date');
  const [sortDir, setSortDir] = useState('desc');

  // Persist to localStorage on every change
  const persist = (updated) => {
    setTxns(updated);
    try { localStorage.setItem('fin_txns', JSON.stringify(updated)); } catch {}
  };

  // ── CRUD ────────────────────────────────────────────────────
  const addTransaction = (form) => {
    const newTxn = { id: Date.now(), ...form, amount: +form.amount };
    persist([newTxn, ...txns]);
  };

  const updateTransaction = (id, form) => {
    persist(txns.map((t) => (t.id === id ? { ...t, ...form, amount: +form.amount } : t)));
  };

  const deleteTransaction = (id) => {
    persist(txns.filter((t) => t.id !== id));
  };

  // ── Sorting ─────────────────────────────────────────────────
  const sortBy = (col) => {
    if (sortCol === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortCol(col); setSortDir('asc'); }
  };

  // ── Filtered + sorted view ───────────────────────────────────
  const filtered = useMemo(() => {
    let res = [...txns];
    if (search)        res = res.filter((t) => t.desc.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()));
    if (fType !== 'all') res = res.filter((t) => t.type === fType);
    if (fCat  !== 'all') res = res.filter((t) => t.category === fCat);
    if (fDateFrom)     res = res.filter((t) => t.date >= fDateFrom);
    if (fDateTo)       res = res.filter((t) => t.date <= fDateTo);
    res.sort((a, b) => {
      const va = sortCol === 'amount' ? +a[sortCol] : a[sortCol];
      const vb = sortCol === 'amount' ? +b[sortCol] : b[sortCol];
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return res;
  }, [txns, search, fType, fCat, fDateFrom, fDateTo, sortCol, sortDir]);

  // ── Aggregate stats ──────────────────────────────────────────
  const totalIncome  = txns.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = txns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance      = totalIncome - totalExpense;
  const savingsRate  = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : '0.0';

  // ── Dynamic monthly data (last 6 months with data) ──────────
  const monthlyData = useMemo(() => {
    // Collect all unique year-month pairs present in transactions
    const monthSet = new Set(txns.map((t) => t.date.slice(0, 7))); // "YYYY-MM"
    const sorted   = [...monthSet].sort();
    // Take up to 6 most recent months
    const recent   = sorted.slice(-6);

    return recent.map((ym) => {
      const [y, m] = ym.split('-').map(Number);
      const monthTxns = txns.filter((t) => t.date.startsWith(ym));
      return {
        label:   MONTH_LABELS[m - 1],
        yearMonth: ym,
        income:  monthTxns.filter((t) => t.type === 'income').reduce((s, t)  => s + t.amount, 0),
        expense: monthTxns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
      };
    });
  }, [txns]);

  const catBreakdown = useMemo(() => {
    const map = {};
    txns.filter((t) => t.type === 'expense').forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.entries(map)
      .map(([cat, val]) => ({
        cat,
        value: val,
        color: catColor(cat),
        pct: totalExpense > 0 ? ((val / totalExpense) * 100).toFixed(1) : '0',
      }))
      .sort((a, b) => b.value - a.value);
  }, [txns, totalExpense]);

  const allCats = [...new Set(txns.map((t) => t.category))].sort();

  return {
    txns,
    filtered,
    search, setSearch,
    fType,  setFType,
    fCat,   setFCat,
    fDateFrom, setFDateFrom,
    fDateTo,   setFDateTo,
    sortCol, sortDir, sortBy,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    savingsRate,
    monthlyData,
    catBreakdown,
    allCats,
  };
}
