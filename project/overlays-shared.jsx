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

// ─── TWITCH LIVE DATA ───────────────────────────────────────────

function useTwitchData() {
  const [cfg] = React.useState(() => ({
    token: localStorage.getItem('twitch_access_token') || '',
    clientId: localStorage.getItem('twitch_client_id') || '',
    clientSecret: localStorage.getItem('twitch_client_secret') || '',
    channel: localStorage.getItem('twitch_channel') || 'yugurekageri',
  }));

  const isConfigured = !!(cfg.token && cfg.clientId && cfg.channel);

  const [userId, setUserId] = React.useState(null);
  const [streamInfo, setStreamInfo] = React.useState(null);
  const [followerCount, setFollowerCount] = React.useState(null);
  const [subCount, setSubCount] = React.useState(null);
  const [goal, setGoal] = React.useState(null);
  const [events, setEvents] = React.useState([]);
  const [uptime, setUptime] = React.useState('00:00:00');
  const [peakViewers, setPeakViewers] = React.useState(() => Number(localStorage.getItem('stream_peak_viewers') || 0) || null);

  const initialFollowersRef = React.useRef(null);
  const initialSubsRef = React.useRef(null);
  const seenFollowsRef = React.useRef(new Set());
  const seenSubsRef = React.useRef(new Set());
  const initializedRef = React.useRef(false);

  const doRefresh = React.useCallback(async () => {
    const rt = localStorage.getItem('twitch_refresh_token');
    if (!rt || !cfg.clientId) return null;
    try {
      const r = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ client_id: cfg.clientId, client_secret: cfg.clientSecret, grant_type: 'refresh_token', refresh_token: rt }),
      });
      if (!r.ok) return null;
      const d = await r.json();
      localStorage.setItem('twitch_access_token', d.access_token);
      if (d.refresh_token) localStorage.setItem('twitch_refresh_token', d.refresh_token);
      if (d.expires_in) localStorage.setItem('twitch_token_expiry', String(Date.now() + d.expires_in * 1000));
      return d.access_token;
    } catch { return null; }
  }, [cfg.clientId]);

  const api = React.useCallback(async (path) => {
    const expiry = Number(localStorage.getItem('twitch_token_expiry') || 0);
    let token = localStorage.getItem('twitch_access_token') || cfg.token;
    if (!token) throw new Error('no token');
    if (expiry && Date.now() > expiry - 300_000) {
      const fresh = await doRefresh();
      if (fresh) token = fresh;
    }
    const req = (t) => fetch(`https://api.twitch.tv/helix${path}`, {
      headers: { 'Authorization': `Bearer ${t}`, 'Client-Id': cfg.clientId },
    });
    let r = await req(token);
    if (r.status === 401) {
      const fresh = await doRefresh();
      if (fresh) r = await req(fresh);
    }
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json();
  }, [cfg.token, cfg.clientId, doRefresh]);

  React.useEffect(() => {
    if (!isConfigured) return;
    let alive = true;
    api(`/users?login=${cfg.channel}`)
      .then(d => { if (alive && d.data?.[0]) setUserId(d.data[0].id); })
      .catch(() => {});
    return () => { alive = false; };
  }, [isConfigured, cfg.channel, api]);

  React.useEffect(() => {
    if (!isConfigured) return;
    let alive = true;
    const poll = () =>
      api(`/streams?user_login=${cfg.channel}`)
        .then(d => {
          if (alive) {
            setStreamInfo(d.data?.[0] ?? null);
            const s = d.data?.[0];
            if (s) {
              setPeakViewers(prev => {
                const next = prev === null ? s.viewer_count : Math.max(prev, s.viewer_count);
                localStorage.setItem('stream_peak_viewers', String(next));
                return next;
              });
              localStorage.setItem('stream_started_at', s.started_at);
            }
          }
        })
        .catch(() => {});
    poll();
    const id = setInterval(poll, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, [isConfigured, cfg.channel, api]);

  React.useEffect(() => {
    if (!streamInfo?.started_at) { setUptime('00:00:00'); return; }
    const start = new Date(streamInfo.started_at).getTime();
    const tick = () => {
      const d = Date.now() - start;
      const h = Math.floor(d / 3_600_000);
      const m = Math.floor((d % 3_600_000) / 60_000);
      const s = Math.floor((d % 60_000) / 1_000);
      setUptime(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`);
    };
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [streamInfo?.started_at]);

  React.useEffect(() => {
    if (!isConfigured || !userId) return;
    let alive = true;
    let pollId = null;

    const fetchFollowers = async () => {
      try {
        const d = await api(`/channels/followers?broadcaster_id=${userId}&first=10`);
        if (!alive) return;
        if (d.total != null) {
          if (initialFollowersRef.current == null) {
            initialFollowersRef.current = d.total;
            localStorage.setItem('stream_start_followers', String(d.total));
          }
          setFollowerCount(d.total);
        }
        const newOnes = (d.data || []).filter(f => !seenFollowsRef.current.has(f.user_id));
        newOnes.forEach(f => seenFollowsRef.current.add(f.user_id));
        if (newOnes.length && initializedRef.current) {
          const mapped = newOnes.map(f => ({
            kind: 'FOLLOW', id: f.user_id, who: f.user_name,
            note: 'new follower', ts: Date.now(),
          }));
          setEvents(prev => [...mapped, ...prev].slice(0, 10));
        }
      } catch(e) {}
    };

    const fetchSubs = async () => {
      try {
        const d = await api(`/subscriptions?broadcaster_id=${userId}&first=10`);
        if (!alive) return;
        if (d.total != null) {
          if (initialSubsRef.current == null) {
            initialSubsRef.current = d.total;
            localStorage.setItem('stream_start_subs', String(d.total));
          }
          setSubCount(d.total);
        }
        const newOnes = (d.data || []).filter(s => !seenSubsRef.current.has(s.user_id));
        newOnes.forEach(s => seenSubsRef.current.add(s.user_id));
        if (newOnes.length && initializedRef.current) {
          const mapped = newOnes.map(s => {
            const tier = s.tier === '2000' ? '2' : s.tier === '3000' ? '3' : '1';
            return {
              kind: 'SUB', id: s.user_id, who: s.user_name,
              note: `tier ${tier}${s.is_gift ? ' · gifted' : ''}`, ts: Date.now(),
            };
          });
          setEvents(prev => [...mapped, ...prev].slice(0, 10));
        }
      } catch(e) {}
    };

    const fetchGoal = async () => {
      try {
        const d = await api(`/goals?broadcaster_id=${userId}`);
        if (!alive) return;
        const g = d.data?.[0];
        if (g) {
          setGoal({
            label: g.description || g.type.replace(/_/g, ' '),
            cur: g.current_amount,
            max: g.target_amount,
          });
        }
      } catch(e) {}
    };

    const init = async () => {
      await Promise.allSettled([fetchFollowers(), fetchSubs(), fetchGoal()]);
      if (!alive) return;
      initializedRef.current = true;
      pollId = setInterval(async () => {
        if (alive) await Promise.allSettled([fetchFollowers(), fetchSubs(), fetchGoal()]);
      }, 60_000);
    };

    init();
    return () => { alive = false; if (pollId) clearInterval(pollId); };
  }, [isConfigured, userId, api]);

  const followerDelta = (followerCount != null && initialFollowersRef.current != null)
    ? followerCount - initialFollowersRef.current : null;
  const subDelta = (subCount != null && initialSubsRef.current != null)
    ? subCount - initialSubsRef.current : null;

  return {
    isConfigured,
    isLive: !!streamInfo,
    uptime,
    viewerCount: streamInfo?.viewer_count ?? null,
    gameName: streamInfo?.game_name ?? null,
    streamTitle: streamInfo?.title ?? null,
    followerCount,
    followerDelta,
    subCount,
    subDelta,
    goal,
    events,
    peakViewers,
  };
}

// ─── TWITCH CHAT (anonymous IRC) ────────────────────────────────

function useTwitchChat() {
  const channel = localStorage.getItem('twitch_channel') || 'yugurekageri';
  const [messages, setMessages] = React.useState([]);
  const [bitsEvents, setBitsEvents] = React.useState([]);

  React.useEffect(() => {
    if (!channel) return;
    let alive = true;
    let ws, reconnectId;

    function connect() {
      ws = new WebSocket('wss://irc-ws.chat.twitch.tv:443');
      ws.onopen = () => {
        ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands');
        ws.send('PASS oauth:blah');
        ws.send(`NICK justinfan${Math.floor(Math.random() * 99999)}`);
        ws.send(`JOIN #${channel.toLowerCase()}`);
      };
      ws.onmessage = (e) => {
        const lines = e.data.split('\r\n').filter(Boolean);
        lines.forEach(line => {
          if (line.startsWith('PING')) { ws.send('PONG :tmi.twitch.tv'); return; }
          if (!line.includes('PRIVMSG')) return;
          const tags = {};
          const tagMatch = line.match(/^@([^ ]+)/);
          if (tagMatch) tagMatch[1].split(';').forEach(t => { const [k,v] = t.split('='); tags[k]=v; });
          const msgMatch = line.match(/PRIVMSG #\w+ :(.+)$/);
          if (!msgMatch) return;
          const msg = msgMatch[1].trim();
          const user = tags['display-name'] || 'user';
          const color = (tags['color'] && tags['color'] !== '') ? tags['color'] : '#9fe4ec';
          const bits = parseInt(tags['bits'] || '0');
          const id = Date.now() + Math.random();
          setMessages(prev => [...prev.slice(-49), { id, user, msg, color, bits }]);
          if (bits > 0) {
            setBitsEvents(prev => [{
              kind: 'BITS', id, who: user,
              note: `${bits.toLocaleString()} bits`, ts: Date.now(),
            }, ...prev].slice(0, 10));
          }
        });
      };
      ws.onclose = () => { if (alive) reconnectId = setTimeout(connect, 5000); };
      ws.onerror = () => ws.close();
    }

    connect();
    return () => { alive = false; clearTimeout(reconnectId); if (ws) ws.close(); };
  }, [channel]);

  return { messages, bitsEvents };
}

// ─── SPOTIFY NOW PLAYING ─────────────────────────────────────────

function useSpotify() {
  const [token, setToken] = React.useState(() => localStorage.getItem('spotify_access_token') || '');
  const [track, setTrack] = React.useState(null);

  React.useEffect(() => {
    const handler = () => setToken(localStorage.getItem('spotify_access_token') || '');
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const doSpotifyRefresh = React.useCallback(async () => {
    const rt = localStorage.getItem('spotify_refresh_token');
    const clientId = localStorage.getItem('spotify_client_id');
    if (!rt || !clientId) return null;
    try {
      const r = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ client_id: clientId, grant_type: 'refresh_token', refresh_token: rt }),
      });
      if (!r.ok) return null;
      const d = await r.json();
      localStorage.setItem('spotify_access_token', d.access_token);
      if (d.refresh_token) localStorage.setItem('spotify_refresh_token', d.refresh_token);
      if (d.expires_in) localStorage.setItem('spotify_token_expiry', String(Date.now() + d.expires_in * 1000));
      setToken(d.access_token);
      return d.access_token;
    } catch { return null; }
  }, []);

  React.useEffect(() => {
    if (!token) return;
    let alive = true;

    const fetchCurrent = async () => {
      let t = localStorage.getItem('spotify_access_token') || token;
      const expiry = Number(localStorage.getItem('spotify_token_expiry') || 0);
      if (expiry && Date.now() > expiry - 300_000) {
        const fresh = await doSpotifyRefresh();
        if (fresh) t = fresh;
      }
      try {
        let r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: { 'Authorization': `Bearer ${t}` },
        });
        if (r.status === 401) {
          const fresh = await doSpotifyRefresh();
          if (!fresh || !alive) return;
          r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { 'Authorization': `Bearer ${fresh}` },
          });
        }
        if (!alive) return;
        if (r.status === 204 || r.status === 404 || !r.ok) { setTrack(null); return; }
        const data = await r.json();
        if (!data?.item) { setTrack(null); return; }
        setTrack({
          name: data.item.name,
          artist: data.item.artists?.map(a => a.name).join(', '),
          album: data.item.album?.name,
          albumArt: data.item.album?.images?.[1]?.url,
          isPlaying: data.is_playing,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
        });
      } catch {}
    };

    fetchCurrent();
    const id = setInterval(fetchCurrent, 5_000);
    return () => { alive = false; clearInterval(id); };
  }, [token, doSpotifyRefresh]);

  return track;
}

function SpotifyNowPlaying({ style = {} }) {
  const track = useSpotify();
  if (!track) return null;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      background: 'rgba(13,21,48,0.82)', backdropFilter: 'blur(10px)',
      border: '1px solid rgba(244,236,216,0.1)', padding: '12px 18px',
      ...style,
    }}>
      {track.albumArt
        ? <img src={track.albumArt} alt="" style={{ width: 48, height: 48, objectFit: 'cover', flexShrink: 0 }} />
        : <div style={{ display:'flex', alignItems:'flex-end', gap: 3, height: 28, flexShrink: 0 }}>
            {[0.55,0.85,0.40,0.75,0.65].map((h,i) =>
              <div key={i} style={{ width:3, height: h*28, background: COLORS.cyan,
                animation: `eq${i%3} ${0.7+i*0.07}s ease-in-out infinite alternate` }} />
            )}
          </div>
      }
      <div style={{ display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        <span style={{ fontFamily:'"JetBrains Mono",monospace', fontSize:9, letterSpacing:2.5, color:COLORS.cyan }}>NOW PLAYING · SPOTIFY</span>
        <span style={{ fontFamily:'"Shippori Mincho",serif', fontSize:16, fontWeight:600, color:COLORS.paper,
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{track.name}</span>
        <span style={{ fontFamily:'"Manrope",sans-serif', fontSize:12, color:'rgba(244,236,216,0.55)',
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{track.artist}</span>
      </div>
    </div>
  );
}

function TwitchSetupBanner({ show }) {
  if (!show) return null;
  return (
    <div style={{
      position: 'absolute',
      bottom: 0, left: 0, right: 0,
      height: 32,
      background: 'rgba(8,12,30,0.97)',
      borderTop: `1px solid ${COLORS.gold}`,
      display: 'flex', alignItems: 'center',
      padding: '0 22px', gap: 12,
      zIndex: 999,
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: 10, letterSpacing: 2.5,
    }}>
      <span style={{ color: COLORS.liveRed }}>◆</span>
      <span style={{ color: 'rgba(244,236,216,0.7)' }}>TWITCH NOT CONNECTED</span>
      <span style={{ color: 'rgba(244,236,216,0.3)' }}>·</span>
      <a href="twitch-setup.html" target="_blank"
         style={{ color: COLORS.cyan, textDecoration: 'none' }}>
        OPEN SETUP →
      </a>
      <span style={{ marginLeft: 'auto', color: 'rgba(244,236,216,0.25)', fontSize: 9, letterSpacing: 1.5 }}>
        OPEN IN BROWSER TO CONFIGURE · HIDDEN IN OBS WHEN CONNECTED
      </span>
    </div>
  );
}

// ─── STREAM SETTINGS (title, schedule) ──────────────────────────
// Reads stream_title and stream_schedule from localStorage,
// re-reads every 5 s so edits in stream-settings.html appear live.

function useStreamSettings() {
  const read = () => ({
    title: localStorage.getItem('stream_title') || '',
    schedule: (() => {
      try { return JSON.parse(localStorage.getItem('stream_schedule') || 'null') || []; }
      catch { return []; }
    })(),
  });

  const [settings, setSettings] = React.useState(read);

  React.useEffect(() => {
    const id = setInterval(() => setSettings(read()), 5000);
    const onStorage = () => setSettings(read());
    window.addEventListener('storage', onStorage);
    return () => { clearInterval(id); window.removeEventListener('storage', onStorage); };
  }, []);

  return settings;
}

Object.assign(window, { COLORS, CornerBracket, VKanji, Seal, LiveDot, SeigaihaTexture, Pill, FeedPlaceholder, useTwitchData, useTwitchChat, useSpotify, SpotifyNowPlaying, TwitchSetupBanner, useStreamSettings });
