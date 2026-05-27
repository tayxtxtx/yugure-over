// Shared visual components for both overlay variants

const COLORS = {
  ink: '#0d1530',
  ink2: '#182144',
  indigo: '#2b2f6e',
  violet: '#6b5cc7',
  cyan: '#6cd6e4',
  cyanSoft: '#9fe4ec',
  gold: '#e6b558',
  goldDeep: '#b58536',
  paper: '#f4ecd8',
  paperMute: 'rgba(244,236,216,0.62)',
  liveRed: '#ff5b5b',
};

// L-bracket corner with gold dot — direction: tl | tr | bl | br
function CornerBracket({ pos = 'tl', size = 90, color = COLORS.gold }) {
  const base = {
    position: 'absolute',
    width: size, height: size,
    borderColor: color,
    borderStyle: 'solid',
    borderWidth: 0,
    opacity: 0.75,
    pointerEvents: 'none',
  };
  const dot = {
    position: 'absolute',
    width: 6, height: 6,
    borderRadius: '50%',
    background: color,
  };
  if (pos === 'tl') Object.assign(base, { top: 22, left: 22, borderTopWidth: 1, borderLeftWidth: 1 });
  if (pos === 'tr') Object.assign(base, { top: 22, right: 22, borderTopWidth: 1, borderRightWidth: 1 });
  if (pos === 'bl') Object.assign(base, { bottom: 22, left: 22, borderBottomWidth: 1, borderLeftWidth: 1 });
  if (pos === 'br') Object.assign(base, { bottom: 22, right: 22, borderBottomWidth: 1, borderRightWidth: 1 });

  const dotPos = {
    tl: { top: -3, left: -3 },
    tr: { top: -3, right: -3 },
    bl: { bottom: -3, left: -3 },
    br: { bottom: -3, right: -3 },
  }[pos];

  return (
    <div style={base}>
      <div style={{ ...dot, ...dotPos }}></div>
    </div>
  );
}

// Vertical kanji column running on the right side
function VKanji({ chars = ['夕', '暮', '翳'], small = 'ON AIR · 2026', top = 50, right = 50, fontSize = 32, gap = 14 }) {
  return (
    <div style={{
      position: 'absolute',
      top, right,
      writingMode: 'vertical-rl',
      fontFamily: '"Shippori Mincho", serif',
      fontWeight: 700,
      fontSize,
      color: 'rgba(244,236,216,0.85)',
      letterSpacing: gap,
      lineHeight: 1,
      zIndex: 5,
      textShadow: '0 0 18px rgba(0,0,0,0.6)',
    }}>
      {chars.join(' ')}
      <small style={{
        display: 'block',
        fontSize: 12,
        letterSpacing: 4,
        color: COLORS.cyan,
        marginTop: 26,
        fontFamily: '"JetBrains Mono", monospace',
        writingMode: 'vertical-rl',
        textShadow: 'none',
      }}>{small}</small>
    </div>
  );
}

// Seal stamp box (single kanji)
function Seal({ kanji = '夕', size = 56 }) {
  return (
    <div style={{
      width: size, height: size,
      background: 'linear-gradient(135deg, #c93b3b 0%, #8a2424 100%)',
      borderRadius: 4,
      display: 'grid',
      placeItems: 'center',
      color: COLORS.paper,
      fontFamily: '"Shippori Mincho", serif',
      fontWeight: 800,
      fontSize: size * 0.46,
      lineHeight: 1,
      boxShadow: '0 4px 14px rgba(0,0,0,0.5), inset 0 0 0 1.5px rgba(244,236,216,0.25)',
      transform: 'rotate(-4deg)',
      letterSpacing: -2,
    }}>{kanji}</div>
  );
}

// Live dot indicator with halo
function LiveDot({ size = 10 }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size,
      background: COLORS.liveRed,
      borderRadius: '50%',
      boxShadow: `0 0 12px ${COLORS.liveRed}, 0 0 0 4px rgba(255,91,91,0.18)`,
      animation: 'livePulse 1.6s ease-in-out infinite',
    }} />
  );
}

// Seigaiha background pattern (subtle, decorative)
function SeigaihaTexture({ opacity = 0.5 }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage:
        'radial-gradient(circle at 40px 40px, transparent 22px, rgba(108,214,228,0.06) 22.5px, rgba(108,214,228,0.06) 24px, transparent 24.5px),' +
        'radial-gradient(circle at 40px 40px, transparent 14px, rgba(230,181,88,0.05) 14.5px, rgba(230,181,88,0.05) 16px, transparent 16.5px),' +
        'radial-gradient(circle at 40px 40px, transparent 6px, rgba(244,236,216,0.04) 6.5px, rgba(244,236,216,0.04) 8px, transparent 8.5px)',
      backgroundSize: '80px 40px',
      backgroundPosition: '0 0, 40px 20px, 0 0',
      opacity,
      pointerEvents: 'none',
    }} />
  );
}

// Pill / chip
function Pill({ children, color = COLORS.gold, bg = 'rgba(13,21,48,0.7)', border = true, size = 'md' }) {
  const sizes = {
    sm: { padding: '4px 10px', fontSize: 10, letterSpacing: 2 },
    md: { padding: '6px 14px', fontSize: 11, letterSpacing: 2 },
    lg: { padding: '8px 18px', fontSize: 12, letterSpacing: 2.5 },
  };
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: '"JetBrains Mono", monospace',
      fontWeight: 500,
      textTransform: 'uppercase',
      color,
      background: bg,
      border: border ? `1px solid ${color}` : 'none',
      borderRadius: 2,
      ...sizes[size],
    }}>{children}</span>
  );
}

// Game/cam placeholder cell (transparent region shown as dark stripe pattern)
function FeedPlaceholder({ label, sub, style = {} }) {
  return (
    <div style={{
      position: 'absolute',
      background:
        'repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 14px, rgba(255,255,255,0) 14px 28px),' +
        'rgba(8,12,30,0.55)',
      border: '1px dashed rgba(244,236,216,0.18)',
      display: 'grid',
      placeItems: 'center',
      color: 'rgba(244,236,216,0.55)',
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 13,
      letterSpacing: 3,
      textTransform: 'uppercase',
      ...style,
    }}>
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontSize: 16, color: 'rgba(244,236,216,0.75)' }}>{label}</div>
        {sub ? <div style={{ fontSize: 10, color: 'rgba(244,236,216,0.4)' }}>{sub}</div> : null}
      </div>
    </div>
  );
}

Object.assign(window, { COLORS, CornerBracket, VKanji, Seal, LiveDot, SeigaihaTexture, Pill, FeedPlaceholder });
