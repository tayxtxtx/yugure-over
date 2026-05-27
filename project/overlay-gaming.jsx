// Gaming overlay — 1920x1080
// Gameplay fills the whole frame; HUD strips top-left & top-right;
// goal bar + event ticker bottom; Spotify now-playing bottom-left

function GamingOverlay({ obs = false } = {}) {
  const twitch = useTwitchData();
  const { bitsEvents } = useTwitchChat();

  const viewerCount = twitch.viewerCount != null ? twitch.viewerCount.toLocaleString() : '—';
  const followDisplay = twitch.followerDelta != null ? '+' + twitch.followerDelta : '—';
  const subDisplay = twitch.subDelta != null ? '+' + twitch.subDelta : '—';
  const gameName = twitch.gameName || 'Elden Ring — Shadow of the Erdtree';
  const liveTime = twitch.uptime;
  const goal = twitch.goal || { label: 'Shamisen sub goal', cur: 318, max: 500 };

  const allEvents = React.useMemo(() => {
    const combined = [...twitch.events, ...bitsEvents];
    combined.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    return combined.slice(0, 6);
  }, [twitch.events, bitsEvents]);

  const pct = (goal.cur / goal.max) * 100;

  return (
    <div style={{
      position: 'relative',
      width: 1920,
      height: 1080,
      fontFamily: '"Manrope", system-ui, sans-serif',
      color: COLORS.paper,
      background: obs
        ? 'transparent'
        : 'repeating-conic-gradient(rgba(255,255,255,0.04) 0 25%, rgba(255,255,255,0.02) 0 50%) 50% / 60px 60px',
      overflow: 'hidden',
    }}>

      {/* Gameplay placeholder — hidden in OBS mode so the real game capture shows through */}
      {obs ? null : (
        <FeedPlaceholder
          label="GAMEPLAY  ·  FULL FRAME"
          sub="1920 × 1080  ·  transparent in OBS"
          style={{ inset: 0, border: 'none' }}
        />
      )}

      {/* ===== TOP STRIP: game info & live ===== */}
      <div style={{
        position: 'absolute',
        top: 36, left: 60,
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
      }}>
        {/* Now playing card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(13,21,48,0.88)',
          backdropFilter: 'blur(10px)',
          padding: '14px 22px',
          borderLeft: `3px solid ${COLORS.gold}`,
        }}>
          <div style={{
            width: 52, height: 52,
            background: 'linear-gradient(135deg, #2b2f6e, #14193d)',
            border: '1px solid rgba(230,181,88,0.45)',
            display: 'grid', placeItems: 'center',
            fontFamily: '"Shippori Mincho", serif',
            fontWeight: 800, fontSize: 26,
            color: COLORS.gold,
            letterSpacing: -1,
          }}>魂</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: 3,
              color: COLORS.cyan,
            }}>NOW PLAYING  ·  游 び</div>
            <div style={{
              fontFamily: '"Shippori Mincho", serif',
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1,
            }}>{gameName}</div>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              letterSpacing: 2,
              color: 'rgba(244,236,216,0.5)',
            }}>NG+2  ·  DEATH 47  ·  TAILS UP</div>
          </div>
        </div>

        {/* Live block */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: 'rgba(13,21,48,0.88)',
          backdropFilter: 'blur(10px)',
          padding: '14px 22px',
          marginLeft: 1,
          borderLeft: `1px solid rgba(244,236,216,0.12)`,
        }}>
          <LiveDot />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11, letterSpacing: 3,
              color: COLORS.paper,
              fontWeight: 600,
            }}>LIVE</span>
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, letterSpacing: 2,
              color: 'rgba(244,236,216,0.55)',
            }}>{liveTime}</span>
          </div>
        </div>
      </div>

      {/* ===== TOP-RIGHT: stats strip ===== */}
      <div style={{
        position: 'absolute',
        top: 36, right: 140,
        display: 'flex',
        background: 'rgba(13,21,48,0.85)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(244,236,216,0.12)',
      }}>
        <Stat label="VIEWERS" value={viewerCount} accent={COLORS.cyan} />
        <Stat label="FOLLOWS" value={followDisplay} accent={COLORS.gold} />
        <Stat label="SUBS" value={subDisplay} accent="#ff8aa6" last />
      </div>

      <VKanji top={210} right={56} fontSize={32} chars={['夕','暮','翳']} small="LIVE · 配 信 中" />

      {/* ===== SPOTIFY NOW PLAYING — bottom left ===== */}
      <SpotifyNowPlaying style={{
        position: 'absolute',
        left: 60, bottom: 145,
        minWidth: 300, maxWidth: 400,
      }} />

      {/* ===== RIGHT-SIDE: EVENT FEED ===== */}
      <div style={{
        position: 'absolute',
        right: 60, bottom: 200,
        width: 360,
        background: 'rgba(13,21,48,0.82)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(244,236,216,0.1)',
      }}>
        <div style={{
          padding: '12px 18px',
          borderBottom: '1px solid rgba(244,236,216,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, letterSpacing: 3,
            color: COLORS.gold,
          }}>RECENT  ·  最 近</span>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: 'rgba(244,236,216,0.4)',
            letterSpacing: 1.5,
          }}>live feed</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {allEvents.length === 0 ? (
            <div style={{
              padding: '18px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, letterSpacing: 2,
              color: 'rgba(244,236,216,0.2)',
            }}>no events yet</div>
          ) : allEvents.map((e, i) => (
            <div key={i} style={{
              padding: '12px 18px',
              borderBottom: i === allEvents.length - 1 ? 'none' : '1px solid rgba(244,236,216,0.06)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <Pill
                size="sm"
                color={
                  e.kind === 'SUB' ? COLORS.gold :
                  e.kind === 'BITS' ? '#ff8aa6' :
                  e.kind === 'RAID' ? COLORS.cyan :
                  COLORS.cyan
                }
              >
                {e.kind}
              </Pill>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                <span style={{
                  fontFamily: '"Shippori Mincho", serif',
                  fontWeight: 600, fontSize: 15,
                  color: COLORS.paper,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{e.who}</span>
                <span style={{
                  fontFamily: '"Manrope", sans-serif',
                  fontSize: 11,
                  color: 'rgba(244,236,216,0.55)',
                  letterSpacing: 0.3,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{e.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM: GOAL BAR ===== */}
      <div style={{
        position: 'absolute',
        left: 440, bottom: 50,
        right: 60,
        height: 80,
        background: 'rgba(13,21,48,0.85)',
        backdropFilter: 'blur(8px)',
        borderTop: `1px solid ${COLORS.gold}`,
        borderBottom: '1px solid rgba(230,181,88,0.3)',
        padding: '14px 24px',
        display: 'grid',
        gridTemplateColumns: '180px 1fr 150px',
        alignItems: 'center',
        gap: 22,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10, letterSpacing: 3,
            color: COLORS.cyan,
          }}>GOAL  ·  目 標</span>
          <span style={{
            fontFamily: '"Shippori Mincho", serif',
            fontSize: 18, fontWeight: 700,
            color: COLORS.paper,
          }}>{goal.label}</span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{
            height: 12,
            background: 'rgba(244,236,216,0.08)',
            border: '1px solid rgba(244,236,216,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: pct + '%',
              background: `linear-gradient(90deg, ${COLORS.cyan} 0%, ${COLORS.gold} 100%)`,
              boxShadow: '0 0 18px rgba(230,181,88,0.5)',
            }} />
            {/* tick marks */}
            {[0.25, 0.5, 0.75].map(t => (
              <div key={t} style={{
                position: 'absolute', left: (t * 100) + '%', top: 0, bottom: 0,
                width: 1, background: 'rgba(244,236,216,0.25)',
              }} />
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            letterSpacing: 1.5,
            color: 'rgba(244,236,216,0.55)',
          }}>
            <span>0</span>
            <span>{Math.round(goal.max / 2)}</span>
            <span>{goal.max}</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2,
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontWeight: 600,
            fontSize: 26,
            color: COLORS.gold,
            letterSpacing: 1,
            lineHeight: 1,
          }}>{goal.cur}<span style={{ color: 'rgba(244,236,216,0.4)', fontSize: 18 }}> / {goal.max}</span></div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10, letterSpacing: 2,
            color: 'rgba(244,236,216,0.5)',
          }}>{pct.toFixed(1)}% · NEXT REWARD</div>
        </div>
      </div>

      {/* Page-level corners */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      <SeigaihaTexture opacity={0.3} />

      <TwitchSetupBanner show={!twitch.isConfigured} />
    </div>
  );
}

function Stat({ label, value, accent, last }) {
  return (
    <div style={{
      padding: '10px 18px',
      borderRight: last ? 'none' : '1px solid rgba(244,236,216,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      minWidth: 100,
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 9,
        letterSpacing: 2.5,
        color: 'rgba(244,236,216,0.5)',
      }}>{label}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontWeight: 600,
        fontSize: 20,
        color: accent,
        letterSpacing: 0.5,
        lineHeight: 1,
      }}>{value}</span>
    </div>
  );
}

window.GamingOverlay = GamingOverlay;
