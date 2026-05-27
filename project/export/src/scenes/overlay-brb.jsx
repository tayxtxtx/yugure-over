// BRB (Be Right Back) — 1920×1080
// "一服" — taking a break. Quieter than Starting Soon: minimal copy,
// playing-now card, drifting waves, small countdown.

function BrbOverlay() {
  const [secs, setSecs] = React.useState(15 * 60);
  React.useEffect(() => {
    const t = setInterval(() => setSecs((s) => s <= 0 ? 15 * 60 : s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  return (
    <div style={{
      position: 'relative',
      width: 1920,
      height: 1080,
      overflow: 'hidden',
      fontFamily: '"Manrope", system-ui, sans-serif',
      color: COLORS.paper,
      background:
      'radial-gradient(900px 700px at 30% 80%, rgba(108,214,228,0.12), transparent 60%),' +
      'radial-gradient(900px 700px at 80% 20%, rgba(107,92,199,0.18), transparent 60%),' +
      'linear-gradient(150deg, #0a1130 0%, #14193d 50%, #0d1530 100%)'
    }}>
      <SeigaihaTexture opacity={0.5} />

      {/* Animated wave bands across the middle */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {[0, 1, 2].map((i) =>
        <svg key={i} viewBox="0 0 1920 200" preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: 0,
          top: 360 + i * 130,
          width: '100%',
          height: 200,
          opacity: 0.35 - i * 0.08,
          animation: `brbDrift ${22 + i * 8}s linear infinite`,
          animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
        }}>
            <path
            d={`M0 100 Q 240 ${60 + i * 5} 480 100 T 960 100 T 1440 100 T 1920 100 V200 H0 Z`}
            fill={i === 0 ? 'rgba(108,214,228,0.18)' : i === 1 ? 'rgba(107,92,199,0.18)' : 'rgba(230,181,88,0.12)'} />
          
          </svg>
        )}
      </div>

      <style>{`
        @keyframes brbDrift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-240px); }
        }
      `}</style>

      {/* Centered seal + headline block */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28
      }}>
        {/* big kanji seal */}
        <div style={{
          width: 220, height: 220,
          background: 'linear-gradient(135deg, #c93b3b 0%, #8a2424 100%)',
          borderRadius: 8,
          display: 'grid',
          placeItems: 'center',
          color: COLORS.paper,
          fontFamily: '"Shippori Mincho", serif',
          fontWeight: 800,
          fontSize: 156,
          lineHeight: 1,
          boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 0 0 3px rgba(244,236,216,0.25)',
          transform: 'rotate(-4deg)',
          letterSpacing: -8
        }}>服</div>

        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 18,
          letterSpacing: 12,
          color: COLORS.cyan,
          marginTop: 18
        }}>BE  ·  RIGHT  ·  BACK</div>

        <h1 style={{
          margin: 0,
          fontFamily: '"Shippori Mincho", serif',
          fontWeight: 700,
          fontSize: 90,
          letterSpacing: -1,
          lineHeight: 1,
          textAlign: 'center'
        }}>
          Stretching tails.<br />
          <span style={{ color: COLORS.gold, fontStyle: 'italic', fontWeight: 600 }}>Back when the strings settle.</span>
        </h1>

        {/* Countdown + now-playing strip */}
        <div style={{
          marginTop: 30,
          display: 'flex',
          alignItems: 'stretch',
          gap: 24
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            background: 'rgba(13,21,48,0.78)',
            border: '1px solid rgba(244,236,216,0.12)',
            padding: '16px 28px',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12, letterSpacing: 3,
              color: COLORS.cyan
            }}>BACK  ·  IN</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              fontSize: 44,
              color: COLORS.gold,
              letterSpacing: 1
            }}>{mm}<span style={{ opacity: 0.6 }}>:</span>{ss}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            background: 'rgba(13,21,48,0.78)',
            border: '1px solid rgba(244,236,216,0.12)',
            padding: '16px 24px',
            backdropFilter: 'blur(10px)'
          }}>
            {/* Equalizer-style bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 28 }}>
              {[0.55, 0.85, 0.40, 0.75, 0.65, 0.30, 0.50].map((h, i) =>
              <div key={i} style={{
                width: 3, height: h * 28 + 'px',
                background: COLORS.cyan,
                animation: `eq${i % 3} ${0.7 + i * 0.07}s ease-in-out infinite alternate`
              }} />
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10, letterSpacing: 2.5,
                color: COLORS.cyan
              }}>NOW  ·  PLAYING</span>
              <span style={{
                fontFamily: '"Shippori Mincho", serif',
                fontSize: 18,
                fontWeight: 600,
                color: COLORS.paper
              }}>lo-fi prowl loop · 二尾 mix</span>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes eq0 { from { height: 8px } to { height: 28px } }
          @keyframes eq1 { from { height: 20px } to { height: 6px } }
          @keyframes eq2 { from { height: 12px } to { height: 24px } }
        `}</style>
      </div>

      {/* Vertical kanji */}
      <VKanji top={80} right={48} chars={['夕', '暮', '翳']} small="BACK · SHORTLY" fontSize={28} />

      {/* Top-left ribbon */}
      <div style={{
        position: 'absolute',
        top: 50, left: 100,
        display: 'flex', alignItems: 'center', gap: 14
      }}>
        <span style={{ width: 30, height: 1, background: COLORS.gold }} />
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 12,
          letterSpacing: 4,
          color: COLORS.paper,
          opacity: 0.65
        }}>YUGURE  ·  KAGERI</span>
      </div>

      {/* Bottom strip */}
      <div style={{
        position: 'absolute',
        bottom: 50, left: 0, right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 100px',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 13,
        letterSpacing: 2,
        color: 'rgba(244,236,216,0.55)'
      }}>
        <span>chat is still on — keep purring · &lt;3</span>
        <span>twitch.tv / yugurekageri  ·  @yugurekageri</span>
      </div>

      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />
    </div>);

}

window.BrbOverlay = BrbOverlay;