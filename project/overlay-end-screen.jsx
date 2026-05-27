// End Screen — 1920×1080 farewell scene
// Today's recap stats, next stream teaser, big socials

function EndScreenOverlay() {
  const twitch = useTwitchData();

  const uptimeStr = React.useMemo(() => {
    const startedAt = localStorage.getItem('stream_started_at');
    if (!startedAt) return twitch.uptime || '—';
    const diff = Date.now() - new Date(startedAt).getTime();
    const h = Math.floor(diff / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  }, [twitch.uptime]);

  const settings = useStreamSettings();

  const peakViewers = localStorage.getItem('stream_peak_viewers');
  const startFollowers = Number(localStorage.getItem('stream_start_followers') || 0);
  const startSubs = Number(localStorage.getItem('stream_start_subs') || 0);

  const stats = [
    { label: 'UPTIME',      jp: '時 間',  value: uptimeStr,
      unit: 'h · m', accent: COLORS.cyan },
    { label: 'PEAK VIEW.',  jp: '頂 点',
      value: peakViewers ? Number(peakViewers).toLocaleString() : '—',
      unit: 'live',  accent: COLORS.gold },
    { label: 'NEW FOLLOWS', jp: '追 加',
      value: twitch.followerDelta != null ? '+' + twitch.followerDelta
        : twitch.followerCount != null ? '+' + Math.max(0, twitch.followerCount - startFollowers) : '—',
      unit: 'today', accent: '#ff8aa6' },
    { label: 'NEW SUBS',    jp: '会 員',
      value: twitch.subDelta != null ? '+' + twitch.subDelta
        : twitch.subCount != null ? '+' + Math.max(0, twitch.subCount - startSubs) : '—',
      unit: 'today', accent: COLORS.cyan },
  ];

  const nextStream = settings.schedule[0] || null;

  const raidTarget = { name: 'shoryuken_jp', tag: '@shoryuken_jp', topic: 'rhythm + fight game co-stream' };

  return (
    <div style={{
      position: 'relative',
      width: 1920,
      height: 1080,
      overflow: 'hidden',
      fontFamily: '"Manrope", system-ui, sans-serif',
      color: COLORS.paper,
      background:
        'radial-gradient(900px 600px at 25% 30%, rgba(230,181,88,0.10), transparent 60%),' +
        'radial-gradient(900px 600px at 80% 70%, rgba(108,92,199,0.18), transparent 60%),' +
        'linear-gradient(150deg, #0a1130 0%, #14193d 40%, #0d1530 100%)',
    }}>
      <SeigaihaTexture opacity={0.45} />

      {/* Sunset glow band */}
      <div style={{
        position: 'absolute',
        left: 0, right: 0,
        top: '50%', height: 200,
        background: 'linear-gradient(180deg, transparent 0%, rgba(230,181,88,0.10) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* TOP: eyebrow + big title */}
      <div style={{
        position: 'absolute',
        left: 100, top: 110,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: 1100,
      }}>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 16, letterSpacing: 8,
          color: COLORS.cyan,
        }}>STREAM  ·  END  ·  終  了</div>
        <h1 style={{
          margin: 0,
          fontFamily: '"Shippori Mincho", serif',
          fontWeight: 800,
          fontSize: 138,
          letterSpacing: -2,
          lineHeight: 0.92,
        }}>
          <span style={{ color: COLORS.gold, fontStyle: 'italic', fontWeight: 600 }}>多謝.</span> Prowl<br/>
          safe, friends
        </h1>
      </div>

      {/* MIDDLE: recap stats grid */}
      <div style={{
        position: 'absolute',
        left: 100, top: 510,
        width: 1080,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginBottom: 18,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12, letterSpacing: 3,
            color: COLORS.gold,
          }}>TODAY  ·  本 日</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(244,236,216,0.18)' }} />
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, letterSpacing: 2,
            color: 'rgba(244,236,216,0.5)',
          }}>recap</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(13,21,48,0.7)',
              border: '1px solid rgba(244,236,216,0.1)',
              borderLeft: `2px solid ${s.accent}`,
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10, letterSpacing: 2.5,
                  color: 'rgba(244,236,216,0.55)',
                }}>{s.label}</span>
                <span style={{
                  fontFamily: '"Shippori Mincho", serif',
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: 2,
                  color: COLORS.cyan,
                }}>{s.jp}</span>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 600,
                fontSize: 44,
                color: s.accent,
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10, letterSpacing: 1.5,
                color: 'rgba(244,236,216,0.5)',
              }}>{s.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM: socials + raid teaser */}
      <div style={{
        position: 'absolute',
        left: 100, bottom: 80,
        width: 1080,
        display: 'flex',
        gap: 18,
        alignItems: 'stretch',
      }}>
        {/* Raid card */}
        <div style={{
          background: 'rgba(13,21,48,0.78)',
          border: `1px solid rgba(230,181,88,0.4)`,
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          flex: 1,
        }}>
          <div style={{
            width: 48, height: 48,
            background: 'linear-gradient(135deg, #2b2f6e, #14193d)',
            border: `1px solid rgba(230,181,88,0.55)`,
            display: 'grid', placeItems: 'center',
            color: COLORS.gold,
            fontFamily: '"Shippori Mincho", serif',
            fontWeight: 800,
            fontSize: 22,
          }}>潮</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, letterSpacing: 3,
              color: COLORS.cyan,
            }}>RAIDING  ·  突 撃</span>
            <span style={{
              fontFamily: '"Shippori Mincho", serif',
              fontSize: 22, fontWeight: 700,
              color: COLORS.paper,
              lineHeight: 1.1,
            }}>{raidTarget.tag}</span>
            <span style={{
              fontFamily: '"Manrope", sans-serif',
              fontSize: 12,
              color: 'rgba(244,236,216,0.55)',
            }}>now streaming · {raidTarget.topic}</span>
          </div>
        </div>

        {/* Socials block */}
        <div style={{
          background: 'rgba(13,21,48,0.78)',
          border: '1px solid rgba(244,236,216,0.1)',
          padding: '18px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flex: 1.4,
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, letterSpacing: 3,
            color: COLORS.gold,
            whiteSpace: 'nowrap',
          }}>FIND  ·  ME</span>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6, flex: 1,
          }}>
            <SocialRow glyph="Y" handle="youtube · @yugurekageri" note="VODs, covers, lo-fi mixes" />
            <SocialRow glyph="X" handle="@yugurekageri" note="updates · mews · setlists" />
            <SocialRow glyph="◐" handle="discord.gg / nekomata" note="prowl between streams" />
          </div>
        </div>
      </div>

      {/* Next stream chip — top right under kanji */}
      {nextStream && (
      <div style={{
        position: 'absolute',
        right: 130, top: 110,
        background: 'rgba(13,21,48,0.85)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${COLORS.gold}`,
        padding: '14px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        zIndex: 6,
      }}>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: 3,
          color: COLORS.cyan,
        }}>NEXT  ·  来 週</span>
        <span style={{
          fontFamily: '"Shippori Mincho", serif',
          fontSize: 19, fontWeight: 700,
          color: COLORS.paper,
        }}>{nextStream.day} · {nextStream.game}</span>
        <span style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: 2,
          color: 'rgba(244,236,216,0.55)',
        }}>21:00 JST  ·  in 2d 14h</span>
      </div>
      )}

      {/* Vertical kanji */}
      <VKanji top={310} right={56} chars={['夕','暮','翳']} small="THANK · YOU" fontSize={32} />

      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />
    </div>
  );
}

function SocialRow({ glyph, handle, note }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 22, height: 22,
        borderRadius: '50%',
        background: 'rgba(244,236,216,0.08)',
        display: 'grid', placeItems: 'center',
        fontFamily: '"Shippori Mincho", serif',
        fontWeight: 700,
        fontSize: 11,
        color: COLORS.cyan,
      }}>{glyph}</div>
      <span style={{
        fontFamily: '"Shippori Mincho", serif',
        fontWeight: 600,
        fontSize: 15,
        color: COLORS.paper,
      }}>{handle}</span>
      <span style={{
        fontFamily: '"Manrope", sans-serif',
        fontSize: 11,
        color: 'rgba(244,236,216,0.5)',
      }}>· {note}</span>
    </div>
  );
}

window.EndScreenOverlay = EndScreenOverlay;
