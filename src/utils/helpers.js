import { CAT_COLORS } from '../data/constants';


export const fmt = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const fmtFull = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(n);

export const catColor = (cat) =>
  CAT_COLORS[cat.toLowerCase()] || "#94a3b8";

export const exportToCSV = (transactions) => {
  const rows = [
    ["Date", "Description", "Category", "Type", "Amount"],
    ...transactions.map((t) => [t.date, t.desc, t.category, t.type, t.amount]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
};
export const todayStr = () => new Date().toISOString().slice(0, 10);
