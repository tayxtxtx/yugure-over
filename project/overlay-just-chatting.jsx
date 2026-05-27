// Just Chatting overlay — 1920x1080
// Webcam fills most of the screen; chat panel on the right; topic banner top-left

function JustChattingOverlay({ obs = false } = {}) {
  const twitch = useTwitchData();
  const { messages: liveChat, bitsEvents } = useTwitchChat();
  const settings = useStreamSettings();

  const streamTitle = settings.title || 'Tail-flicks, vinyl & weekly mews';

  const displayChat = liveChat.slice(-8);

  const allEvents = React.useMemo(() => {
    const combined = [...twitch.events, ...bitsEvents];
    combined.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    return combined.slice(0, 3);
  }, [twitch.events, bitsEvents]);

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

      {/* Webcam feed placeholder — hidden in OBS mode so the real cam shows through */}
      {obs ? null : (
        <FeedPlaceholder
          label="WEBCAM FEED"
          sub="1340 × 980  ·  transparent in OBS"
          style={{ left: 60, top: 130, width: 1340, height: 880, borderRadius: 6 }}
        />
      )}

      {/* corner ornaments around webcam */}
      <div style={{ position: 'absolute', left: 60, top: 130, width: 1340, height: 880, pointerEvents: 'none' }}>
        <CornerBracket pos="tl" size={44} />
        <CornerBracket pos="tr" size={44} />
        <CornerBracket pos="bl" size={44} />
        <CornerBracket pos="br" size={44} />
      </div>

      {/* TOP BANNER — topic / show title */}
      <div style={{
        position: 'absolute',
        top: 36, left: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        background: 'linear-gradient(90deg, rgba(13,21,48,0.92) 0%, rgba(13,21,48,0.65) 80%, rgba(13,21,48,0) 100%)',
        backdropFilter: 'blur(8px)',
        padding: '14px 26px 14px 22px',
        borderLeft: `3px solid ${COLORS.gold}`,
        minWidth: 660,
      }}>
        <Seal kanji="夕" size={56} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: 4,
            color: COLORS.cyan,
          }}>JUST  ·  CHATTING  ·  雑談  ·  二尾</div>
          <div style={{
            fontFamily: '"Shippori Mincho", serif',
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}>{streamTitle}</div>
        </div>
      </div>

      {/* TOP-RIGHT: live + stats */}
      <div style={{
        position: 'absolute',
        top: 44, right: 130,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        zIndex: 6,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 14px',
          background: 'rgba(13,21,48,0.85)',
          border: `1px solid ${COLORS.liveRed}`,
        }}>
          <LiveDot />
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12, fontWeight: 600,
            letterSpacing: 3,
            color: COLORS.paper,
          }}>LIVE</span>
        </div>
        <Pill color={COLORS.cyan} size="md">{twitch.uptime}</Pill>
        <Pill color={COLORS.gold} size="md">▲ {twitch.viewerCount != null ? twitch.viewerCount.toLocaleString() : '—'}</Pill>
      </div>

      {/* Vertical kanji */}
      <VKanji top={140} right={48} fontSize={28} chars={['夕','暮','翳']} small="STREAMING · LIVE" />

      {/* SPOTIFY NOW PLAYING — right of title banner */}
      <SpotifyNowPlaying style={{
        position: 'absolute',
        left: 805, top: 36,
        width: 380,
      }} />

      {/* CHAT PANEL — right side */}
      <div style={{
        position: 'absolute',
        right: 110, top: 130, width: 420, height: 800,
        background: 'linear-gradient(180deg, rgba(13,21,48,0.88) 0%, rgba(20,25,55,0.75) 100%)',
        border: '1px solid rgba(244,236,216,0.12)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header strip */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid rgba(244,236,216,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11, letterSpacing: 3,
            color: COLORS.gold,
          }}>CHAT · 流</div>
          <div style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10, letterSpacing: 1.5,
            color: 'rgba(244,236,216,0.4)',
          }}>{twitch.viewerCount != null ? (twitch.viewerCount >= 1000 ? (twitch.viewerCount / 1000).toFixed(1) + 'k' : twitch.viewerCount) + ' watching' : '— watching'}</div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
          {displayChat.map((c, i) => (
            <div key={c.id != null ? c.id : i} style={{
              fontSize: 14,
              lineHeight: 1.45,
              opacity: 0.4 + (i / displayChat.length) * 0.6,
            }}>
              <span style={{ color: c.color, fontWeight: 600, marginRight: 6 }}>{c.user}</span>
              <span style={{ color: 'rgba(244,236,216,0.5)' }}>·</span>
              <span style={{ marginLeft: 8, color: 'rgba(244,236,216,0.92)' }}>{c.msg}</span>
            </div>
          ))}
        </div>

        {/* Input mock */}
        <div style={{
          padding: '12px 18px',
          borderTop: '1px solid rgba(244,236,216,0.1)',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: 'rgba(244,236,216,0.45)',
          letterSpacing: 1,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: COLORS.cyan }}>›</span>
          send a message
          <span style={{ marginLeft: 'auto', color: COLORS.gold }}>/sub</span>
        </div>
      </div>

      {/* BOTTOM TICKER — recent events */}
      <div style={{
        position: 'absolute',
        left: 60, bottom: 36,
        width: 1340,
        height: 60,
        background: 'rgba(13,21,48,0.85)',
        borderTop: `1px solid ${COLORS.gold}`,
        borderBottom: `1px solid rgba(230,181,88,0.3)`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 26,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{
          fontFamily: '"Shippori Mincho", serif',
          fontWeight: 700,
          fontSize: 18,
          color: COLORS.gold,
          paddingRight: 24,
          borderRight: '1px solid rgba(244,236,216,0.18)',
          display: 'flex', alignItems: 'center', gap: 10,
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 12, fontFamily: '"JetBrains Mono", monospace', color: COLORS.cyan, letterSpacing: 2 }}>妖 · YOKAI</span>
          <span style={{ position: 'relative', top: -5 }}>recent</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, flex: 1, overflow: 'hidden' }}>
          {allEvents.length === 0 ? (
            <span style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10, letterSpacing: 2,
              color: 'rgba(244,236,216,0.2)',
            }}>no events yet</span>
          ) : allEvents.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap' }}>
              <Pill
                size="sm"
                color={e.kind === 'FOLLOW' ? COLORS.cyan : e.kind === 'SUB' ? COLORS.gold : '#ff8aa6'}
                border={true}
              >
                {e.kind}
              </Pill>
              <span style={{ fontFamily: '"Shippori Mincho", serif', fontWeight: 600, fontSize: 15, color: COLORS.paper }}>{e.who}</span>
              <span style={{ fontSize: 13, color: 'rgba(244,236,216,0.55)' }}>{e.note}</span>
            </div>
          ))}
        </div>
        <div style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: 2,
          color: 'rgba(244,236,216,0.55)',
          display: 'flex', alignItems: 'center', gap: 12,
          flexShrink: 0,
        }}>
          <span>twitch / yugurekageri</span>
          <span style={{ width: 4, height: 4, background: COLORS.gold, borderRadius: '50%' }}></span>
          <span>@yugurekageri</span>
        </div>
      </div>

      {/* Page-level corner ornaments */}
      <CornerBracket pos="tl" />
      <CornerBracket pos="tr" />
      <CornerBracket pos="bl" />
      <CornerBracket pos="br" />

      <SeigaihaTexture opacity={0.35} />

      <TwitchSetupBanner show={!twitch.isConfigured} />
    </div>
  );
}

window.JustChattingOverlay = JustChattingOverlay;
