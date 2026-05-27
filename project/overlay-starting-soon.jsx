// Starting Soon — 1920×1080 full-bleed pre-stream scene
// Countdown center-stage, character on the right, next stream teaser at bottom

function StartingSoonOverlay() {
  // Decorative countdown — counts down from 5:00, loops
  const [secs, setSecs] = React.useState(5 * 60);
  React.useEffect(() => {
    const t = setInterval(() => setSecs(s => s <= 0 ? 5 * 60 : s - 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');

  const schedulePeek = React.useMemo(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('stream_schedule') || 'null');
      if (Array.isArray(saved) && saved.length) return saved;
    } catch {}
    return [
      { day: 'TUE', jp: '火', game: 'Horror Night · Faith III' },
      { day: 'WED', jp: '水', game: 'Lo-fi & Karaoke' },
      { day: 'FRI', jp: '金', game: 'Elden Ring DLC · Boss Rush' },
    ];
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: 1920,
      height: 1080,
      overflow: 'hidden',
      fontFamily: '"Manrope", system-ui, sans-serif',
      color: COLORS.paper,
      background:
        'radial-gradient(900px 600px at 70% 60%, rgba(108,214,228,0.12), transparent 60%),' +
        'radial-gradient(800px 600px at 20% 30%, rgba(107,92,199,0.20), transparent 60%),' +
        'linear-gradient(150deg, #0d1530 0%, #14193d 45%, #0a1130 100%)',
    }}>
      <SeigaihaTexture opacity={0.6} />

      {/* Drifting water bands at the bottom */}
      <div style={{
        position: 'absolute',
        left: -50, right: -50, bottom: 0, height: 280,
        background:
          'linear-gradient(180deg, transparent 0%, rgba(108,92,199,0.18) 50%, rgba(108,214,228,0.22) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Big moon ring behind character */}
      <div style={{
        position: 'absolute',
        width: 720, height: 720,
        right: 30, top: 80,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 40% 35%, rgba(108,214,228,0.18) 0%, rgba(108,214,228,0.05) 35%, transparent 65%),' +
          'conic-gradient(from 220deg, rgba(230,181,88,0.55), rgba(108,92,199,0.35), rgba(108,214,228,0.5), rgba(230,181,88,0.55))',
        filter: 'blur(0.5px)',
        opacity: 0.85,
      }} />
      <div style={{
        position: 'absolute',
        width: 720, height: 720,
        right: 30, top: 80,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 50% 45%, rgba(13,21,48,0.0) 60%, #0d1530 75%),' +
          'radial-gradient(circle at 50% 50%, rgba(108,92,199,0.18), rgba(13,21,48,0.95) 70%)',
      }} />
      <div style={{
        position: 'absolute',
        width: 820, height: 820,
        right: -20, top: 30,
        borderRadius: '50%',
        border: '1px dashed rgba(244,236,216,0.12)',
      }} />

      {/* TOP — kanji eyebrow + title */}
      <div style={{
        position: 'absolute',
        left: 100, top: 110,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 16,
          letterSpacing: 8,
          color: COLORS.cyan,
        }}>STREAM  ·  STARTING  ·  猫又  起 き る</div>
        <h1 style={{
          margin: 0,
          fontFamily: '"Shippori Mincho", serif',
          fontWeight: 800,
          fontSize: 130,
          letterSpacing: -2,
          lineHeight: 0.95,
        }}>
          The cat<br/>
          <span style={{ color: COLORS.gold, fontStyle: 'italic', fontWeight: 600 }}>awakens</span>
        </h1>
      </div>

      {/* Countdown */}
      <div style={{
        position: 'absolute',
        left: 100, top: 530,
        display: 'flex',
        alignItems: 'flex-end',
        gap: 22,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: 600,
          fontSize: 220,
          lineHeight: 0.9,
          letterSpacing: -8,
          color: COLORS.paper,
          textShadow: '0 0 40px rgba(108,214,228,0.25)',
        }}>{mm}<span style={{ color: COLORS.gold, opacity: 0.8 }}>:</span>{ss}</div>
        <div style={{
          paddingBottom: 22,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14,
            letterSpacing: 4,
            color: COLORS.cyan,
          }}>UNTIL  ·  LIVE</span>
          <span style={{
            fontFamily: '"Shippori Mincho", serif',
            fontSize: 28,
            color: COLORS.paper,
          }}>ears up, controllers ready ♪</span>
        </div>
      </div>

      {/* BOTTOM — schedule preview */}
      <div style={{
        position: 'absolute',
        left: 100, bottom: 90,
        right: 880,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12, letterSpacing: 3,
            color: COLORS.gold,
          }}>NEXT  ·  予 定</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(244,236,216,0.18)' }} />
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          {schedulePeek.map((p, i) => (
            <div key={i} style={{
              flex: 1,
              background: 'rgba(13,21,48,0.55)',
              border: '1px solid rgba(244,236,216,0.1)',
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                fontFamily: '"Shippori Mincho", serif',
                fontWeight: 700,
                fontSize: 22,
                color: COLORS.paper,
                display: 'flex', flexDirection: 'column', lineHeight: 1,
              }}>
                {p.day}
                <span style={{ fontSize: 13, color: COLORS.cyan, letterSpacing: 2, marginTop: 4 }}>{p.jp}</span>
              </div>
              <div style={{
                fontFamily: '"Shippori Mincho", serif',
                fontSize: 16,
                color: COLORS.paper,
                opacity: 0.85,
              }}>{p.game}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical kanji + social block */}
      <VKanji top={80} right={48} chars={['夕','暮','翳']} small="LIVE · @yugurekageri" fontSize={30} />

      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />
    </div>
  );
}

window.StartingSoonOverlay = StartingSoonOverlay;
