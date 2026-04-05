/**
 * Sparkline
 * Tiny inline SVG line + area chart for summary cards.
 */
export default function Sparkline({ data, color, width = 72, height = 28 }) {
  if (!data || data.length < 2) return null;

  const min   = Math.min(...data);
  const max   = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map(
    (v, i) =>
      `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * (height - 2) - 1}`
  );

  const linePath = `M${pts[0]} ${pts.slice(1).map((p) => `L${p}`).join(' ')}`;
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={areaPath} fill={color} opacity="0.18" />
      <path d={linePath} fill="none" stroke={color} strokeWidth="1.8" />
    </svg>
  );
}
