const Hero = () => {
  const [logs, setLogs] = React.useState([]);
  const [nodesAnimated, setNodesAnimated] = React.useState(false);
  const terminalRef = React.useRef(null);

  const sampleLogs = [
    { ts: "14:02:11", service: "gmail", msg: "Inbound email parsed → lead created", status: "ok" },
    { ts: "14:02:11", service: "hubspot", msg: "Contact upserted: acme.co", status: "ok" },
    { ts: "14:02:12", service: "slack", msg: "#sales notified (P1 lead)", status: "ok" },
    { ts: "14:02:18", service: "stripe", msg: "Invoice INV-4821 created · $4,800", status: "ok" },
    { ts: "14:02:19", service: "notion", msg: "Project db row added", status: "ok" },
    { ts: "14:02:22", service: "openai", msg: "Summary generated (312 tokens)", status: "ok" },
    { ts: "14:02:23", service: "airtable", msg: "Record synced to CRM", status: "ok" },
    { ts: "14:02:28", service: "telegram", msg: "Client pinged with update", status: "ok" },
    { ts: "14:02:32", service: "typeform", msg: "Form submission routed", status: "ok" },
    { ts: "14:02:33", service: "calendly", msg: "Meeting booked · Thu 15:00", status: "ok" },
    { ts: "14:02:35", service: "claude", msg: "Draft reply generated", status: "ok" },
    { ts: "14:02:38", service: "make", msg: "Scenario finished · 2.1s", status: "ok" },
    { ts: "14:02:41", service: "webhook", msg: "Retry attempt 2/3", status: "warn" },
    { ts: "14:02:42", service: "webhook", msg: "Retry successful", status: "ok" },
    { ts: "14:02:48", service: "sheets", msg: "Row appended · Q2 pipeline", status: "ok" },
  ];

  React.useEffect(() => {
    let i = 0;
    // seed first few
    setLogs(sampleLogs.slice(0, 6));
    i = 6;
    const iv = setInterval(() => {
      const entry = { ...sampleLogs[i % sampleLogs.length], id: Date.now() + Math.random() };
      setLogs(prev => {
        const next = [...prev, entry];
        return next.slice(-14);
      });
      i++;
    }, 1400);
    return () => clearInterval(iv);
  }, []);

  React.useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  React.useEffect(() => {
    const t = setTimeout(() => setNodesAnimated(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <div className="hero-grid-bg" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-left">
          <div className="availability">
            <span className="dot"></span>
            <span>AVAILABLE FOR NEW PROJECTS · LIVE IN 7 DAYS</span>
          </div>

          <h1 className="hero-title">
            Replace manual work with<br />
            <span className="hero-title-accent">
              systems that run 24/7
              <svg className="hero-underline" viewBox="0 0 420 12" preserveAspectRatio="none">
                <path d="M2 9 Q 80 2, 160 6 T 320 5 T 418 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="hero-sub">
            Your stack stays yours. I wire it, you run it.
            <span className="muted"> Live in 3–7 days. No code on your side.</span>
          </p>

          <div className="hero-ctas">
            <a href="#contact" className="btn btn-primary">
              Get a free workflow audit
              <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#projects" className="btn btn-ghost">
              See recent projects
            </a>
          </div>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <div className="hero-meta-n mono">120+</div>
              <div className="hero-meta-l">workflows shipped</div>
            </div>
            <div className="hero-meta-sep"></div>
            <div className="hero-meta-item">
              <div className="hero-meta-n mono">40+</div>
              <div className="hero-meta-l">integrations wired</div>
            </div>
            <div className="hero-meta-sep"></div>
            <div className="hero-meta-item">
              <div className="hero-meta-n mono">3–7d</div>
              <div className="hero-meta-l">avg. delivery</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="terminal">
            <div className="terminal-head">
              <div className="terminal-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="terminal-title mono">floxolab · live workflow log</div>
              <div className="terminal-status mono">
                <span className="live-dot"></span>
                LIVE
              </div>
            </div>
            <div className="terminal-body" ref={terminalRef}>
              {logs.map((l, i) => (
                <div key={l.id || i} className={`log-line log-${l.status}`}>
                  <span className="log-ts">{l.ts}</span>
                  <span className="log-service">{l.service.padEnd(9)}</span>
                  <span className="log-arrow">→</span>
                  <span className="log-msg">{l.msg}</span>
                  <span className={`log-badge log-badge-${l.status}`}>
                    {l.status === "ok" ? "200" : "RETRY"}
                  </span>
                </div>
              ))}
            </div>
            <div className="terminal-foot mono">
              <span>last 24h · 1,284 runs</span>
              <span className="success-rate">99.4% success</span>
              <span className="cursor">▮</span>
            </div>
          </div>

          <svg className={`hero-nodes ${nodesAnimated ? "animated" : ""}`} viewBox="0 0 440 440" aria-hidden="true">
            <defs>
              <linearGradient id="line-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.14 160 / 0.0)"/>
                <stop offset="50%" stopColor="oklch(0.72 0.14 160 / 0.6)"/>
                <stop offset="100%" stopColor="oklch(0.72 0.14 160 / 0.0)"/>
              </linearGradient>
            </defs>
            <g className="nodes-lines">
              <path d="M60 80 Q 160 120, 220 220" />
              <path d="M380 80 Q 280 120, 220 220" />
              <path d="M60 360 Q 160 320, 220 220" />
              <path d="M380 360 Q 280 320, 220 220" />
            </g>
            <g className="nodes-dots">
              <circle cx="60" cy="80" r="5"/>
              <circle cx="380" cy="80" r="5"/>
              <circle cx="60" cy="360" r="5"/>
              <circle cx="380" cy="360" r="5"/>
              <circle cx="220" cy="220" r="7" className="node-core"/>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};

window.Hero = Hero;
