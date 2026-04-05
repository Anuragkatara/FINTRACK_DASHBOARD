import { useState, useRef, useCallback } from 'react';

export default function CashFlowChart({ monthlyData }) {
  const W = 700, H = 210, PL = 64, PR = 16, PT = 16, PB = 36;
  const cW = W - PL - PR;
  const cH = H - PT - PB;

  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState(null); // { x, y, monthIdx }

  const buildCurve = (type) => {
    const pts = [];
    let cum = 0;
    monthlyData.forEach((m, mi) => {
      const val = m[type];
      const steps = 40;
      for (let d = 0; d <= steps; d++) {
        pts.push({ x: mi + d / steps, y: cum + (val * d) / steps });
      }
      cum += val;
    });
    return pts;
  };

  const incPts = buildCurve('income');
  const expPts = buildCurve('expense');
  const maxY = Math.max(...incPts.map((p) => p.y), ...expPts.map((p) => p.y)) * 1.12 || 1;
  const maxX  = monthlyData.length;

  const sx = (x) => PL + (x / maxX) * cW;
  const sy = (y) => PT + cH - (y / maxY) * cH;

  const pathStr = (pts) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${sx(p.x).toFixed(1)},${sy(p.y).toFixed(1)}`).join(' ');

  const areaStr = (pts) => {
    const line  = pathStr(pts);
    const last  = pts[pts.length - 1];
    const first = pts[0];
    return `${line} L${sx(last.x).toFixed(1)},${(PT + cH).toFixed(1)} L${sx(first.x).toFixed(1)},${(PT + cH).toFixed(1)} Z`;
  };

  const yTicks = Array.from({ length: 5 }, (_, i) => {
    const val   = (maxY / 4) * i;
    const label = val === 0 ? '$0' : val >= 1000 ? `$${Math.round(val / 1000)}K` : `$${Math.round(val)}`;
    return { val, label };
  });

 
  const getMonthFromClientX = useCallback((clientX) => {
    if (!svgRef.current) return null;
    const rect    = svgRef.current.getBoundingClientRect();
    const svgX    = ((clientX - rect.left) / rect.width) * W; 
    const chartX  = svgX - PL;                                  
    if (chartX < 0 || chartX > cW) return null;
    const fraction = chartX / cW;                                
    const monthIdx = Math.min(
      Math.floor(fraction * maxX),
      monthlyData.length - 1
    );
    return monthIdx;
  }, [cW, maxX, monthlyData.length]);

  const showTooltip = useCallback((clientX) => {
    const monthIdx = getMonthFromClientX(clientX);
    if (monthIdx === null) { setTooltip(null); return; }

  
    const lineX = sx(monthIdx + 0.5);
    setTooltip({ lineX, monthIdx });
  }, [getMonthFromClientX, sx]);

  const handleMouseMove = (e) => showTooltip(e.clientX);
  const handleMouseLeave = ()  => setTooltip(null);

  const handleTouchMove = (e) => {
    e.preventDefault();
    showTooltip(e.touches[0].clientX);
  };
  const handleTouchEnd = () => setTooltip(null);

  const tooltipWidth  = 140;
  const tooltipHeight = 76;
  const getTooltipX = (lx) => {
    let tx = lx + 10;
    if (tx + tooltipWidth > W - PR) tx = lx - tooltipWidth - 10;
    return tx;
  };

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const activeMonth = tooltip !== null ? monthlyData[tooltip.monthIdx] : null;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      height="100%"
      style={{ display: 'block', cursor: 'crosshair' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <defs>
        <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="85%" stopColor="#10b981" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#f43f5e" stopOpacity="0.4" />
          <stop offset="85%" stopColor="#f43f5e" stopOpacity="0.03" />
        </linearGradient>
        <clipPath id="cc">
          <rect x={PL} y={PT} width={cW} height={cH} />
        </clipPath>
      </defs>

      
      {yTicks.map(({ val, label }) => (
        <g key={val}>
          <line
            x1={PL} y1={sy(val)} x2={PL + cW} y2={sy(val)}
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3"
          />
          <text x={PL - 8} y={sy(val) + 4} textAnchor="end" fontSize="9.5" fill="#475569">
            {label}
          </text>
        </g>
      ))}

      
      <g clipPath="url(#cc)">
        <path d={areaStr(incPts)} fill="url(#ig)" />
        <path d={areaStr(expPts)} fill="url(#eg)" />
        <path d={pathStr(incPts)} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathStr(expPts)} fill="none" stroke="#f43f5e" strokeWidth="2"   strokeLinecap="round" strokeLinejoin="round" />
      </g>

   
      {tooltip && activeMonth && (() => {
        const lx = tooltip.lineX;
        const tx = getTooltipX(lx);
        const ty = PT + 4;
        const net = activeMonth.income - activeMonth.expense;

        return (
          <g>
           
            <line
              x1={lx} y1={PT} x2={lx} y2={PT + cH}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              strokeDasharray="4 3"
            />

            
            <circle
              cx={lx}
              cy={sy(activeMonth.income)}
              r="4"
              fill="#10b981"
              stroke="#0d1b2e"
              strokeWidth="2"
            />

            
            <circle
              cx={lx}
              cy={sy(activeMonth.expense)}
              r="4"
              fill="#f43f5e"
              stroke="#0d1b2e"
              strokeWidth="2"
            />

            
            <rect
              x={tx}
              y={ty}
              width={tooltipWidth}
              height={tooltipHeight}
              rx="8"
              fill="#0d1b2e"
              stroke="#1e293b"
              strokeWidth="1"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
            />

           
            <text x={tx + 10} y={ty + 16} fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="0.5">
              {activeMonth.label.toUpperCase()}
            </text>

            
            <circle cx={tx + 10} cy={ty + 30} r="3.5" fill="#10b981" />
            <text x={tx + 18} y={ty + 34} fontSize="10" fill="#94a3b8">Income</text>
            <text x={tx + tooltipWidth - 8} y={ty + 34} fontSize="10" fontWeight="600" fill="#10b981" textAnchor="end">
              {fmt(activeMonth.income)}
            </text>

            
            <circle cx={tx + 10} cy={ty + 48} r="3.5" fill="#f43f5e" />
            <text x={tx + 18} y={ty + 52} fontSize="10" fill="#94a3b8">Expense</text>
            <text x={tx + tooltipWidth - 8} y={ty + 52} fontSize="10" fontWeight="600" fill="#f43f5e" textAnchor="end">
              {fmt(activeMonth.expense)}
            </text>

            {/* Net row */}
            <line x1={tx + 8} y1={ty + 58} x2={tx + tooltipWidth - 8} y2={ty + 58} stroke="#1e293b" strokeWidth="1" />
            <text x={tx + 10} y={ty + 70} fontSize="10" fill="#64748b">Net</text>
            <text
              x={tx + tooltipWidth - 8}
              y={ty + 70}
              fontSize="10"
              fontWeight="700"
              fill={net >= 0 ? '#34d399' : '#f43f5e'}
              textAnchor="end"
            >
              {net >= 0 ? '+' : ''}{fmt(net)}
            </text>
          </g>
        );
      })()}

     
      {monthlyData.map((m, i) => (
        <text
          key={i}
          x={sx(i + 0.5)}
          y={H - 8}
          textAnchor="middle"
          fontSize="10"
          fill={tooltip?.monthIdx === i ? '#e2e8f0' : '#475569'}
          fontWeight={tooltip?.monthIdx === i ? '600' : '400'}
        >
          {m.label}
        </text>
      ))}
    </svg>
  );
}