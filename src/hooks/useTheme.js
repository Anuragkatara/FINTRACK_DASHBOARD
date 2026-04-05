import { useMemo } from 'react';

/**
 * Returns a set of Tailwind class strings based on current dark mode state.
 * Centralises all theme token logic so components stay clean.
 */
export function useTheme(dark) {
  return useMemo(() => ({
    bg:      dark ? "bg-[#060e1a]"              : "bg-slate-100",
    card:    dark ? "bg-[#0d1b2e] border-slate-800" : "bg-white border-slate-200",
    card2:   dark ? "bg-[#0f2338] border-slate-700" : "bg-slate-50 border-slate-200",
    sidebar: dark ? "bg-[#07101e] border-slate-800" : "bg-white border-slate-200",
    header:  dark ? "bg-[#07101e]/80 border-slate-800" : "bg-white/80 border-slate-200",
    txt:     dark ? "text-slate-100"            : "text-gray-900",
    txt2:    dark ? "text-slate-400"            : "text-gray-500",
    txt3:    dark ? "text-slate-300"            : "text-gray-700",
    inp:     dark
      ? "bg-[#0d1b2e] border-slate-700 text-slate-200 placeholder-slate-500"
      : "bg-slate-50 border-slate-300 text-gray-800 placeholder-gray-400",
    hov:     dark ? "hover:bg-[#0f2338]"        : "hover:bg-slate-50",
    div:     dark ? "divide-slate-800"          : "divide-slate-100",
    bdr:     dark ? "border-slate-800"          : "border-slate-200",
    navAct:  dark
      ? "bg-emerald-900/40 text-emerald-400"
      : "bg-emerald-50 text-emerald-700",
  }), [dark]);
}
