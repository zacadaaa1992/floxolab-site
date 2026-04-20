const DEMOS = [
  {
    id: "lead",
    title: "Inbound lead → closed ticket",
    trigger: "Form submission",
    nodes: [
      { id: "t", label: "Typeform", type: "trigger", x: 60, y: 80 },
      { id: "e", label: "Enrich (Apollo)", type: "action", x: 260, y: 80 },
      { id: "ai", label: "AI score", type: "ai", x: 460, y: 80 },
      { id: "r", label: "Route", type: "logic", x: 660, y: 80 },
      { id: "h", label: "HubSpot", type: "action", x: 540, y: 200 },
      { id: "s", label: "Slack #sales", type: "action", x: 740, y: 200 },
    ],
    edges: [["t","e"],["e","ai"],["ai","r"],["r","h"],["r","s"]],
  },
  {
    id: "invoice",
    title: "Invoice → paid → books",
    trigger: "Stripe payment",
    nodes: [
      { id: "s", label: "Stripe event", type: "trigger", x: 60, y: 130 },
      { id: "p", label: "Parse invoice", type: "action", x: 260, y: 130 },
      { id: "ai", label: "AI categorize", type: "ai", x: 460, y: 130 },
      { id: "x", label: "Xero sync", type: "action", x: 660, y: 80 },
      { id: "sh", label: "Sheets row", type: "action", x: 660, y: 200 },
    ],
    edges: [["s","p"],["p","ai"],["ai","x"],["ai","sh"]],
  },
  {
    id: "content",
    title: "Brief → draft → publish",
    trigger: "Notion status",
    nodes: [
      { id: "n", label: "Notion brief", type: "trigger", x: 60, y: 130 },
      { id: "ai", label: "Claude draft", type: "ai", x: 260, y: 130 },
      { id: "r", label: "Human review", type: "logic", x: 460, y: 130 },
      { id: "w", label: "Webflow CMS", type: "action", x: 660, y: 80 },
      { id: "t", label: "X thread", type: "action", x: 660, y: 200 },
    ],
    edges: [["n","ai"],["ai","r"],["r","w"],["r","t"]],
  },
];

const NODE_STYLES = {
  trigger: { c: "oklch(0.72 0.14 160)", label: "TRIG" },
  action: { c: "rgba(255,255,255,0.7)", label: "ACT" },
  ai: { c: "oklch(0.78 0.14 85)", label: "AI" },
  logic: { c: "oklch(0.65 0.18 25)", label: "LOGIC" },
};

const Demo = () => {
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [pulseEdge, setPulseEdge] = React.useState(0);
  const demo = DEMOS[idx];

  React.useEffect(() => {
    if (!playing) return;
    const iv = setInterval(() => {
      setPulseEdge(p => (p + 1) % demo.edges.length);
    }, 900);
    return () => clearInterval(iv);
  }, [playing, demo]);

  const nodeById = id => demo.nodes.find(n => n.id === id);

  return (
    <section className="section" id="demo">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Live demo</div>
            <h2 className="section-title">
              Workflows, not diagrams.<br />
              <span className="dim">Pick one, watch it run.</span>
            </h2>
          </div>
          <p className="section-sub">
            Real integrations. Anonymized data. Hit play and watch the workflow fire.
          </p>
        </div>

        <div className="demo-tabs">
          {DEMOS.map((d, i) => (
            <button
              key={d.id}
              className={`demo-tab ${i === idx ? "active" : ""}`}
              onClick={() => { setIdx(i); setPulseEdge(0); }}
            >
              <span className="demo-tab-n mono">0{i+1}</span>
              <span className="demo-tab-t">{d.title}</span>
            </button>
          ))}
        </div>

        <div className="demo-canvas">
          <div className="demo-canvas-head">
            <div className="mono demo-trigger">
              <span className="demo-trigger-dot"></span>
              TRIGGER · {demo.trigger}
            </div>
            <div className="demo-controls">
              <button
                className="demo-btn"
                onClick={() => setPlaying(!playing)}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
                ) : (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
                {playing ? "PAUSE" : "PLAY"}
              </button>
              <span className="mono demo-rt">RUNTIME · 1.8s</span>
            </div>
          </div>

          <div className="demo-canvas-body">
            <svg className="demo-bg" viewBox="0 0 800 280" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <pattern id="demo-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.06)"/>
                </pattern>
              </defs>
              <rect width="800" height="280" fill="url(#demo-dots)"/>
            </svg>

            <svg className="demo-edges" viewBox="0 0 800 280">
              {demo.edges.map(([a, b], i) => {
                const from = nodeById(a);
                const to = nodeById(b);
                const mx = (from.x + to.x) / 2;
                const d = `M ${from.x + 60} ${from.y} C ${mx} ${from.y}, ${mx} ${to.y}, ${to.x} ${to.y}`;
                const active = i === pulseEdge && playing;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                    {active && (
                      <>
                        <path d={d} fill="none" stroke="var(--accent)" strokeWidth="1.5"
                          strokeDasharray="4 6" className="edge-flow"/>
                        <circle r="3" fill="var(--accent)">
                          <animateMotion dur="0.8s" repeatCount="1" path={d} />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}
            </svg>

            {demo.nodes.map(n => {
              const st = NODE_STYLES[n.type];
              // Canvas viewBox is 800x280. Convert to percentages; shift rightmost nodes inward so they don't clip.
              const leftPct = (n.x / 800) * 100;
              const topPct = ((n.y - 18) / 280) * 100;
              const isRight = n.x >= 640;
              return (
                <div
                  key={n.id}
                  className={`demo-node demo-node-${n.type}`}
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: isRight ? "translateX(-100%)" : "none",
                  }}
                >
                  <span className="demo-node-badge mono" style={{color: st.c, borderColor: st.c}}>
                    {st.label}
                  </span>
                  <span className="demo-node-label">{n.label}</span>
                </div>
              );
            })}
          </div>

          <div className="demo-canvas-foot mono">
            <span>{demo.nodes.length} nodes · {demo.edges.length} connections</span>
            <span className="demo-foot-ok">● all operational</span>
          </div>
        </div>
      </div>
    </section>
  );
};

window.Demo = Demo;
