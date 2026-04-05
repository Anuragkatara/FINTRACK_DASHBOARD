
export const CAT_COLORS = {
  food:          "#f59e0b",
  transport:     "#3b82f6",
  housing:       "#8b5cf6",
  health:        "#ec4899",
  entertainment: "#14b8a6",
  shopping:      "#f97316",
  utilities:     "#64748b",
  salary:        "#10b981",
  freelance:     "#6366f1",
  investment:    "#06b6d4",
  other:         "#94a3b8",
};

export const CAT_ICONS = {
  Food:          "🍔",
  Transport:     "🚗",
  Housing:       "🏠",
  Health:        "💊",
  Entertainment: "🎬",
  Shopping:      "🛍️",
  Utilities:     "⚡",
  Salary:        "💼",
  Freelance:     "💻",
  Investment:    "📈",
  Other:         "📦",
};


export const CATEGORIES = [
  "Food", "Transport", "Housing", "Health",
  "Entertainment", "Shopping", "Utilities",
  "Salary", "Freelance", "Investment", "Other",
];


export const TABS = [
  { id: "overview",      icon: "◈", label: "Overview"      },
  { id: "transactions",  icon: "⇅", label: "Transactions"  },
  { id: "insights",      icon: "◎", label: "Insights"      },
];


export const SEED_TRANSACTIONS = [
  { id: 1,  date: "2024-03-01", desc: "Monthly Salary",    amount: 5500,  category: "Salary",        type: "income"  },
  { id: 2,  date: "2024-03-02", desc: "Grocery Store",     amount: 128.5, category: "Food",          type: "expense" },
  { id: 3,  date: "2024-03-03", desc: "Netflix",           amount: 15.99, category: "Entertainment", type: "expense" },
  { id: 4,  date: "2024-03-04", desc: "Freelance Project", amount: 850,   category: "Freelance",     type: "income"  },
  { id: 5,  date: "2024-03-05", desc: "Electricity Bill",  amount: 89.4,  category: "Utilities",     type: "expense" },
  { id: 6,  date: "2024-03-06", desc: "Uber Ride",         amount: 24.5,  category: "Transport",     type: "expense" },
  { id: 7,  date: "2024-03-08", desc: "Restaurant Dinner", amount: 67.8,  category: "Food",          type: "expense" },
  { id: 8,  date: "2024-03-10", desc: "Rent",              amount: 1400,  category: "Housing",       type: "expense" },
  { id: 9,  date: "2024-03-11", desc: "Amazon Shopping",   amount: 143.6, category: "Shopping",      type: "expense" },
  { id: 10, date: "2024-03-12", desc: "Stock Dividend",    amount: 220,   category: "Investment",    type: "income"  },
  { id: 11, date: "2024-03-13", desc: "Pharmacy",          amount: 38.2,  category: "Health",        type: "expense" },
  { id: 12, date: "2024-03-14", desc: "Gas Station",       amount: 55,    category: "Transport",     type: "expense" },
  { id: 13, date: "2024-03-15", desc: "Coffee Shop",       amount: 12.4,  category: "Food",          type: "expense" },
  { id: 14, date: "2024-03-16", desc: "Gym Membership",    amount: 49.99, category: "Health",        type: "expense" },
  { id: 15, date: "2024-03-17", desc: "Freelance Design",  amount: 600,   category: "Freelance",     type: "income"  },
  { id: 16, date: "2024-03-18", desc: "Spotify",           amount: 9.99,  category: "Entertainment", type: "expense" },
  { id: 17, date: "2024-03-20", desc: "Internet Bill",     amount: 69.99, category: "Utilities",     type: "expense" },
  { id: 18, date: "2024-03-21", desc: "Supermarket",       amount: 98.3,  category: "Food",          type: "expense" },
  { id: 19, date: "2024-03-22", desc: "Movie Tickets",     amount: 32,    category: "Entertainment", type: "expense" },
  { id: 20, date: "2024-03-24", desc: "Bus Pass",          amount: 45,    category: "Transport",     type: "expense" },
  { id: 21, date: "2024-03-25", desc: "Dental Checkup",    amount: 150,   category: "Health",        type: "expense" },
  { id: 22, date: "2024-03-26", desc: "Online Course",     amount: 79,    category: "Entertainment", type: "expense" },
  { id: 23, date: "2024-03-27", desc: "Water Bill",        amount: 34.5,  category: "Utilities",     type: "expense" },
  { id: 24, date: "2024-03-28", desc: "Clothing Store",    amount: 187,   category: "Shopping",      type: "expense" },
  { id: 25, date: "2024-03-30", desc: "Bonus Payment",     amount: 1000,  category: "Salary",        type: "income"  },
  { id: 26, date: "2024-02-01", desc: "Monthly Salary",    amount: 5500,  category: "Salary",        type: "income"  },
  { id: 27, date: "2024-02-03", desc: "Grocery Store",     amount: 112,   category: "Food",          type: "expense" },
  { id: 28, date: "2024-02-05", desc: "Rent",              amount: 1400,  category: "Housing",       type: "expense" },
  { id: 29, date: "2024-02-08", desc: "Freelance Work",    amount: 720,   category: "Freelance",     type: "income"  },
  { id: 30, date: "2024-02-10", desc: "Electricity Bill",  amount: 95.2,  category: "Utilities",     type: "expense" },
  { id: 31, date: "2024-02-14", desc: "Valentine Dinner",  amount: 110,   category: "Food",          type: "expense" },
  { id: 32, date: "2024-02-18", desc: "Shopping",          amount: 230,   category: "Shopping",      type: "expense" },
  { id: 33, date: "2024-02-20", desc: "Investment Returns",amount: 180,   category: "Investment",    type: "income"  },
  { id: 34, date: "2024-02-22", desc: "Transport",         amount: 78,    category: "Transport",     type: "expense" },
  { id: 35, date: "2024-02-25", desc: "Health Insurance",  amount: 120,   category: "Health",        type: "expense" },
  { id: 36, date: "2024-01-01", desc: "Monthly Salary",    amount: 5500,  category: "Salary",        type: "income"  },
  { id: 37, date: "2024-01-04", desc: "New Year Dinner",   amount: 145,   category: "Food",          type: "expense" },
  { id: 38, date: "2024-01-06", desc: "Rent",              amount: 1400,  category: "Housing",       type: "expense" },
  { id: 39, date: "2024-01-10", desc: "Freelance Project", amount: 950,   category: "Freelance",     type: "income"  },
  { id: 40, date: "2024-01-15", desc: "Medical Visit",     amount: 200,   category: "Health",        type: "expense" },
  { id: 41, date: "2024-01-20", desc: "Shopping Spree",    amount: 320,   category: "Shopping",      type: "expense" },
  { id: 42, date: "2024-01-25", desc: "Investment Returns",amount: 210,   category: "Investment",    type: "income"  },
  { id: 43, date: "2024-01-28", desc: "Utilities",         amount: 180,   category: "Utilities",     type: "expense" },
];
