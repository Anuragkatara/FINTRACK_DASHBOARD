import { useState } from 'react';
import Modal from './ui/Modal';
import { CATEGORIES } from '../data/constants';
import { todayStr } from '../utils/helpers';

const EMPTY_FORM = {
  desc:     '',
  amount:   '',
  category: 'Food',
  type:     'expense',
  date:     todayStr(),
};

export default function TransactionModal({ open, onClose, onSave, editTx, dark, theme }) {
  const { txt, txt2, inp } = theme;

  const [form, setForm] = useState(() =>
    editTx
      ? { desc: editTx.desc, amount: editTx.amount, category: editTx.category, type: editTx.type, date: editTx.date }
      : { ...EMPTY_FORM }
  );

  
  const handleOpen = () => {
    setForm(
      editTx
        ? { desc: editTx.desc, amount: editTx.amount, category: editTx.category, type: editTx.type, date: editTx.date }
        : { ...EMPTY_FORM }
    );
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    if (!form.desc || !form.amount) return;
    onSave(form, editTx?.id ?? null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} dark={dark}>
      <h2 className={`text-base font-semibold mb-5 ${txt}`}>
        {editTx ? 'Edit Transaction' : 'Add Transaction'}
      </h2>

      <div className="space-y-4">
      
        {[
          { label: 'Description', key: 'desc',   type: 'text',   placeholder: 'e.g. Grocery Store' },
          { label: 'Amount',      key: 'amount',  type: 'number', placeholder: '0.00'               },
          { label: 'Date',        key: 'date',    type: 'date',   placeholder: ''                   },
        ].map((f) => (
          <div key={f.key}>
            <label className={`block text-xs font-medium mb-1.5 ${txt2}`}>{f.label}</label>
            <input
              type={f.type}
              value={form[f.key]}
              onChange={set(f.key)}
              placeholder={f.placeholder}
              className={`w-full text-sm rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
            />
          </div>
        ))}

    
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${txt2}`}>Category</label>
          <select
            value={form.category}
            onChange={set('category')}
            className={`w-full text-sm rounded-xl px-3.5 py-2.5 border focus:outline-none focus:ring-2 focus:ring-emerald-500 ${inp}`}
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

       
        <div>
          <label className={`block text-xs font-medium mb-1.5 ${txt2}`}>Type</label>
          <div className="flex gap-2">
            {['income', 'expense'].map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, type: t }))}
                className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                  form.type === t
                    ? t === 'income'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : dark
                    ? 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    : 'bg-slate-100 text-gray-500 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

    
      <div className="flex gap-2 mt-6">
        <button
          onClick={onClose}
          className={`flex-1 py-2.5 rounded-xl border text-sm transition-colors ${
            dark
              ? 'border-slate-700 text-slate-400 hover:bg-slate-800'
              : 'border-slate-300 text-gray-500 hover:bg-slate-50'
          }`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
        >
          {editTx ? 'Update' : 'Add'}
        </button>
      </div>
    </Modal>
  );
}
