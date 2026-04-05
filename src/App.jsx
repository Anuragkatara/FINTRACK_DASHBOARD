import { useState } from 'react';

import { useTheme }        from './hooks/useTheme';
import { useTransactions } from './hooks/useTransactions';
import { exportToCSV }     from './utils/helpers';

import Sidebar            from './components/layout/Sidebar';
import Header             from './components/layout/Header';
import MobileTabs         from './components/layout/MobileTabs';
import TransactionModal   from './components/TransactionModal';
import Toast              from './components/ui/Toast';

import Overview     from './components/tabs/Overview';
import Transactions from './components/tabs/Transactions';
import Insights     from './components/tabs/Insights';

export default function App() {
  // ── UI state ────────────────────────────────────────────────
  const [tab,   setTab]   = useState('overview');
  const [role,  setRole]  = useState('admin');
  const [dark,  setDark]  = useState(true);
  const [toast, setToast] = useState(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editTx,    setEditTx]    = useState(null);   // null = add mode

  // ── Derived ─────────────────────────────────────────────────
  const isAdmin = role === 'admin';
  const theme   = useTheme(dark);

  // ── Transactions hook ────────────────────────────────────────
  const txState = useTransactions();

  // ── Modal helpers ────────────────────────────────────────────
  const openAdd  = ()         => { setEditTx(null); setModalOpen(true); };
  const openEdit = (tx)       => { setEditTx(tx);   setModalOpen(true); };
  const closeModal = ()       => setModalOpen(false);

  const handleSave = (form, editId) => {
    if (editId) {
      txState.updateTransaction(editId, form);
      setToast('Updated ✓');
    } else {
      txState.addTransaction(form);
      setToast('Added ✓');
    }
  };

  const handleDelete = (id) => {
    txState.deleteTransaction(id);
    setToast('Deleted');
  };

  // ── Render ───────────────────────────────────────────────────
  const { bg, txt } = theme;

  return (
    <div className={`min-h-screen ${bg} ${txt}`} style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar (desktop) */}
        <Sidebar
          tab={tab} setTab={setTab}
          role={role} setRole={setRole}
          dark={dark} setDark={setDark}
          theme={theme}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">

          {/* Top header bar */}
          <Header
            tab={tab}
            role={role} setRole={setRole}
            dark={dark} setDark={setDark}
            isAdmin={isAdmin}
            onAdd={openAdd}
            onExport={() => exportToCSV(txState.txns)}
            theme={theme}
          />

          {/* Mobile bottom tabs */}
          <MobileTabs tab={tab} setTab={setTab} dark={dark} theme={theme} />

          {/* Page content */}
          <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">

            {tab === 'overview' && (
              <Overview
                totalIncome={txState.totalIncome}
                totalExpense={txState.totalExpense}
                balance={txState.balance}
                savingsRate={txState.savingsRate}
                monthlyData={txState.monthlyData}
                catBreakdown={txState.catBreakdown}
                txns={txState.txns}
                dark={dark}
                theme={theme}
                setTab={setTab}
              />
            )}

            {tab === 'transactions' && (
              <Transactions
                filtered={txState.filtered}
                allCats={txState.allCats}
                search={txState.search}         setSearch={txState.setSearch}
                fType={txState.fType}           setFType={txState.setFType}
                fCat={txState.fCat}             setFCat={txState.setFCat}
                fDateFrom={txState.fDateFrom}   setFDateFrom={txState.setFDateFrom}
                fDateTo={txState.fDateTo}       setFDateTo={txState.setFDateTo}
                sortCol={txState.sortCol}
                sortDir={txState.sortDir}
                sortBy={txState.sortBy}
                isAdmin={isAdmin}
                onEdit={openEdit}
                onDelete={handleDelete}
                dark={dark}
                theme={theme}
              />
            )}

            {tab === 'insights' && (
              <Insights
                catBreakdown={txState.catBreakdown}
                monthlyData={txState.monthlyData}
                totalIncome={txState.totalIncome}
                totalExpense={txState.totalExpense}
                balance={txState.balance}
                savingsRate={txState.savingsRate}
                txns={txState.txns}
                dark={dark}
                theme={theme}
              />
            )}

          </div>
        </main>
      </div>

      {/* Add / Edit Modal */}
      <TransactionModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editTx={editTx}
        dark={dark}
        theme={theme}
      />

      {/* Toast notification */}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
