# FinTrack — Finance Dashboard UI

A clean, interactive finance dashboard built with **React 18 + Vite + Tailwind CSS** as part of the Zorvyn Frontend Developer Internship assignment.

---

## 🔗 Live Demo

> **Deployed on Vercel:** _https://fintrack-dashboard-9446ayq62-anuragkataras-projects.vercel.app/_

---

## 🎯 Assignment Coverage

| Requirement | Status | Details |
|---|:---:|---|
| Dashboard Overview (summary cards) | ✅ | Balance, Income, Expense, Savings Rate cards with sparklines |
| Time-based visualization | ✅ | Cumulative cash-flow SVG area chart (monthly, interactive tooltip) |
| Categorical visualization | ✅ | Interactive donut chart + category bar chart |
| Transaction list with Date/Amount/Category/Type | ✅ | Sortable table with all four fields |
| Simple filtering | ✅ | Filter by type, category, and **date range** |
| Sorting / Search | ✅ | Search by name or category; sort by any column |
| Role-based UI (Admin / Viewer) | ✅ | Viewer: read-only. Admin: add, edit, delete transactions |
| Role switcher | ✅ | Dropdown in sidebar (desktop) and header (mobile) |
| Insights – highest spending category | ✅ | KPI card + bar chart |
| Insights – monthly comparison | ✅ | Dynamic per-month cards (last ≤6 months with data) |
| Insights – useful observations | ✅ | 5 auto-generated observations with contextual icons |
| State management | ✅ | Custom hooks (`useTransactions`, `useTheme`) with `localStorage` persistence |
| Responsive design | ✅ | Sidebar on desktop; bottom tab bar on mobile |
| Empty / no-data states | ✅ | Handled in all three tabs |
| **Dark mode** *(optional)* | ✅ | Toggle in sidebar; default dark |
| **Data persistence** *(optional)* | ✅ | `localStorage` — survives page refresh |
| **CSV export** *(optional)* | ✅ | Downloads all transactions as `.csv` |
| **Animations / transitions** *(optional)* | ✅ | Hover effects, bar chart transitions, donut expand-on-hover |

---

## 🗂️ Project Structure

```
fintrack/
├── index.html
├── package.json
├── vite.config.js
├── vercel.json               # SPA rewrite rule — fixes 404 on Vercel
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
    │   └── constants.js      # Colors, icons, categories, seed transactions (43 entries)
    │
    ├── utils/
    │   └── helpers.js        # fmt(), fmtFull(), catColor(), exportToCSV(), todayStr()
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
        │   └── MobileTabs.jsx     # Bottom tab bar (mobile)
        │
        ├── charts/
        │   ├── CashFlowChart.jsx  # SVG cumulative area chart (interactive tooltip)
        │   ├── DonutChart.jsx     # SVG donut chart (hover-to-expand slices)
        │   └── Sparkline.jsx      # Tiny inline sparkline on summary cards
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

### Dashboard Overview
- **Summary cards** — Total Balance, Income, Expenses, Savings Rate — each with a sparkline trend
- **Cash Flow Chart** — SVG area chart showing cumulative income vs. expense by month; hover for tooltip
- **Spending Breakdown** — Interactive donut chart with hover-to-highlight slices
- **Recent Transactions** — Quick-view list of the 5 latest entries

### Transactions
- **Search** — Full-text search across description and category
- **Filters** — Filter by type (income/expense), category, and date range (from/to)
- **Sort** — Click any column header; toggle asc/desc
- **Active filter chips** — Dismiss individual filters inline
- **Clickable badges** — Click a category or type badge in a row to instantly filter by it

### Insights
- **KPI cards** — Top spending category, expense change (dynamic month labels), savings rate
- **Category bar chart** — Proportional bars for all expense categories
- **Monthly comparison grid** — Income, expenses, and net for each month in the dataset
- **5 auto-generated observations** — Contextual advice based on actual data

### Admin / Viewer Roles
| Feature | Admin | Viewer |
|---|:---:|:---:|
| View all data | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |
| Export CSV | ✅ | ✅ |

Switch roles using the dropdown in the **sidebar** (desktop) or **header** (mobile).

### Settings
- **Dark / Light mode** — Toggle in sidebar or header; defaults to dark
- **Data persistence** — All changes saved to `localStorage` automatically
- **CSV export** — Downloads all transactions as `transactions.csv`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Pure SVG | All charts — no external chart library |
| localStorage | Client-side persistence |

---

## 🧠 State Management Approach

All application state lives in two custom hooks:

- **`useTransactions`** — Owns the full transaction list, all filter/sort state, CRUD actions, and derived aggregates (totals, monthly breakdowns, category breakdowns). Persists to `localStorage` on every mutation.
- **`useTheme`** — Derives a set of memoised Tailwind class strings from the `dark` boolean. Every component receives only the tokens it needs — no ad-hoc dark/light conditionals scattered through the codebase.

`App.jsx` is the single wiring point: it holds top-level UI state (current tab, role, dark mode, modal open/close, toast) and passes slices down to leaf components as props.

---

## 📋 Assumptions Made

- Data is mock/static (no backend). Seed transactions cover Jan–Mar 2024.
- Roles are simulated on the frontend for demonstration purposes only.
- Currency is displayed in INR (₹) using `Intl.NumberFormat`.
- Monthly chart shows the last ≤6 months that have at least one transaction.
