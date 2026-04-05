# FinTrack — Personal Finance Dashboard

A clean, production-ready React + Vite finance tracker with dark/light mode, admin/viewer roles, CSV export, and localStorage persistence.

---

## 🗂️ Project Structure

```
fintrack/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Root component — wires everything together
    ├── index.css             # Tailwind base + custom scrollbar
    │
    ├── data/
    │   └── constants.js      # Colors, icons, categories, seed transactions
    │
    ├── utils/
    │   └── helpers.js        # fmt(), fmtFull(), catColor(), exportToCSV()
    │
    ├── hooks/
    │   ├── useTheme.js       # Returns Tailwind class tokens for dark/light mode
    │   └── useTransactions.js# All transaction state: CRUD, filter, sort, stats
    │
    └── components/
        ├── TransactionModal.jsx   # Add / Edit modal form
        │
        ├── layout/
        │   ├── Sidebar.jsx        # Left nav (desktop)
        │   ├── Header.jsx         # Sticky top bar
        │   └── MobileTabs.jsx     # Bottom tabs (mobile)
        │
        ├── charts/
        │   ├── CashFlowChart.jsx  # SVG cumulative area chart
        │   ├── DonutChart.jsx     # SVG donut chart
        │   └── Sparkline.jsx      # Tiny inline sparkline
        │
        ├── tabs/
        │   ├── Overview.jsx       # Overview tab page
        │   ├── Transactions.jsx   # Transactions tab page
        │   └── Insights.jsx       # Insights tab page
        │
        └── ui/
            ├── Modal.jsx          # Generic overlay modal
            └── Toast.jsx          # Auto-dismiss toast notification
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
cd fintrack
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 3. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## ✨ Features

| Feature | Details |
|---|---|
| **Overview** | Summary cards, cumulative cash-flow chart, donut chart, recent transactions |
| **Transactions** | Search, filter by type & category, sort by any column |
| **Insights** | KPI cards, category bar chart, monthly comparison, key observations |
| **Admin / Viewer** | Admin can add, edit, delete. Viewer is read-only |
| **Dark / Light mode** | Toggle in sidebar or header |
| **CSV Export** | Downloads all transactions as a `.csv` file |
| **Persistence** | Saves to `localStorage` automatically |

---

## 🛠️ Tech Stack

- **React 18** — UI
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Styling
- **Pure SVG** — All charts (no chart library dependency)
