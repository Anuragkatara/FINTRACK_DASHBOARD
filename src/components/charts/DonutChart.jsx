
import { useState } from 'react';

export default function DonutChart({ data, size = 128 }) {
  const [hovered, setHovered] = useState(null); 

  const total = data.reduce((s, d) => s + d.value, 0);
  if (!total) return null;

  const cx    = size / 2;
  const cy    = size / 2;
  const r     = size * 0.4;
  const inner = size * 0.26;

  let angle = -Math.PI / 2;

  const slices = data.map((d, i) => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const midAngle = angle + sweep / 2; 

    const x1  = cx + r * Math.cos(angle);
    const y1  = cy + r * Math.sin(angle);
    angle += sweep;
    const x2  = cx + r * Math.cos(angle);
    const y2  = cy + r * Math.sin(angle);
    const xi1 = cx + inner * Math.cos(angle - sweep);
    const yi1 = cy + inner * Math.sin(angle - sweep);
    const xi2 = cx + inner * Math.cos(angle);
    const yi2 = cy + inner * Math.sin(angle);
    const lg  = sweep > Math.PI ? 1 : 0;

   
    const offset  = hovered === i ? size * 0.06 : 0;
    const offsetX = Math.cos(midAngle) * offset;
    const offsetY = Math.sin(midAngle) * offset;

    const pct = ((d.value / total) * 100).toFixed(1);

    return {
      ...d,
      index: i,
      pct,
      offsetX,
      offsetY,
      path: `M${x1},${y1} A${r},${r} 0 ${lg},1 ${x2},${y2} L${xi2},${yi2} A${inner},${inner} 0 ${lg},0 ${xi1},${yi1} Z`,
    };
  });

  const activeSlice = hovered !== null ? slices[hovered] : null;

 
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }}
      >
        {slices.map((s) => (
          <path
            key={s.index}
            d={s.path}
            fill={s.color}
            opacity={hovered === null || hovered === s.index ? 0.95 : 0.35}
            transform={`translate(${s.offsetX}, ${s.offsetY})`}
            style={{
              cursor: 'pointer',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={() => setHovered(s.index)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={() => setHovered(s.index)}
            onTouchEnd={() => setHovered(null)}
          />
        ))}

        
        {activeSlice ? (
          <>
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize={size * 0.13}
              fontWeight="700"
              fill={activeSlice.color}
            >
              {activeSlice.pct}%
            </text>
            <text
              x={cx}
              y={cy + size * 0.12}
              textAnchor="middle"
              fontSize={size * 0.085}
              fill="#64748b"
            >
              {activeSlice.label
                ? activeSlice.label.length > 8
                  ? activeSlice.label.slice(0, 7) + '…'
                  : activeSlice.label
                : ''}
            </text>
          </>
        ) : (
          <text
            x={cx}
            y={cy + size * 0.06}
            textAnchor="middle"
            fontSize={size * 0.1}
            fontWeight="600"
            fill="#475569"
          >
            {fmt(total)}
          </text>
        )}
      </svg>

      
      {activeSlice && (
        <div
          style={{
            position:     'absolute',
            top:          '50%',
            left:         '110%',
            transform:    'translateY(-50%)',
            background:   '#0d1b2e',
            border:       '1px solid #1e293b',
            borderRadius: 10,
            padding:      '8px 12px',
            minWidth:     120,
            pointerEvents:'none',
            boxShadow:    '0 8px 24px rgba(0,0,0,0.5)',
            zIndex:       10,
          }}
        >
         
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: activeSlice.color, flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#e2e8f0' }}>
              {activeSlice.label || `Slice ${activeSlice.index + 1}`}
            </span>
          </div>

         
          <div style={{ fontSize: 13, fontWeight: 700, color: activeSlice.color, marginBottom: 2 }}>
            {fmt(activeSlice.value)}
          </div>

        
          <div style={{ fontSize: 11, color: '#64748b' }}>
            {activeSlice.pct}% of total
          </div>
        </div>
      )}
    </div>
  );
}