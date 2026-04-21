const HowItWorks = () => {
  const steps = [
    {
      n: "01", label: "DISCOVER",
      title: "Workflow audit",
      desc: "Free 30-min call. I map your current process, find the bottlenecks, and quote exactly what I'd automate first.",
      dur: "Day 0",
      artifact: "audit",
    },
    {
      n: "02", label: "DESIGN",
      title: "Blueprint & scope",
      desc: "You get an n8n flow diagram, list of integrations, edge cases, cost estimate, and a fixed delivery date.",
      dur: "Day 1",
      artifact: "blueprint",
    },
    {
      n: "03", label: "BUILD",
      title: "Build & test",
      desc: "I build in an isolated environment, run it with your real data, and stress-test retries, failures, and malformed inputs.",
      dur: "Day 2–5",
      artifact: "build",
    },
    {
      n: "04", label: "SHIP",
      title: "Go live & handoff",
      desc: "Deployed to your n8n (self-hosted or cloud). Docs, video walkthrough, monitoring dashboard included.",
      dur: "Day 5–7",
      artifact: "ship",
    },
    {
      n: "05", label: "SUPPORT",
      title: "Maintain & evolve",
      desc: "30 days of free adjustments. Optional retainer for ongoing ops, new workflows, incident response.",
      dur: "Day 7+",
      artifact: "support",
    },
  ];

  const renderArtifact = (k) => {
    if (k === "audit") return (
      <div className="artifact artifact-audit">
        <div className="artifact-head mono">NOTES · discovery</div>
        <div className="artifact-body">
          <div className="artifact-row"><span className="a-check">✓</span> Lead intake ·  manual copy</div>
          <div className="artifact-row"><span className="a-check">✓</span> Invoicing ·  spreadsheet</div>
          <div className="artifact-row"><span className="a-check">✓</span> Onboarding ·  4 tools</div>
          <div className="artifact-row a-dim"><span>○</span> Scheduling (ok)</div>
        </div>
      </div>
    );
    if (k === "blueprint") return (
      <div className="artifact artifact-blueprint">
        <svg viewBox="0 0 200 110" preserveAspectRatio="xMidYMid meet">
          <rect x="10" y="15" width="44" height="22" rx="3" fill="rgba(255,255,255,0.06)" stroke="var(--accent)" strokeWidth="1"/>
          <rect x="80" y="15" width="44" height="22" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
          <rect x="150" y="15" width="44" height="22" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
          <rect x="80" y="70" width="44" height="22" rx="3" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
          <path d="M54 26 L 80 26 M 124 26 L 150 26 M 102 37 L 102 70" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" strokeDasharray="2 2"/>
        </svg>
        <div className="artifact-foot mono">4 nodes · 3 integrations</div>
      </div>
    );
    if (k === "build") return (
      <div className="artifact artifact-build mono">
        <div className="a-line"><span className="a-ok">●</span> test_01 · lead_routing · <span className="a-ok">OK</span></div>
        <div className="a-line"><span className="a-ok">●</span> test_02 · retry_logic · <span className="a-ok">OK</span></div>
        <div className="a-line"><span className="a-warn">●</span> test_03 · malformed · <span className="a-warn">FIXED</span></div>
        <div className="a-line"><span className="a-ok">●</span> test_04 · rate_limit · <span className="a-ok">OK</span></div>
      </div>
    );
    if (k === "ship") return (
      <div className="artifact artifact-ship mono">
        <div className="a-deploy"><span className="a-ok">▲</span> deploy · production</div>
        <div className="a-sub">↳ 200 OK · webhook live</div>
        <div className="a-sub">↳ docs.md · runbook.md</div>
        <div className="a-sub">↳ monitor dashboard: live</div>
      </div>
    );
    if (k === "support") return (
      <div className="artifact artifact-support">
        <div className="artifact-head mono">UPTIME · 30d</div>
        <svg viewBox="0 0 180 40" preserveAspectRatio="none" className="uptime-bar">
          {[...Array(30)].map((_,i) => (
            <rect key={i} x={i * 6} y={i === 12 ? 8 : 4} width="4" height={i === 12 ? 28 : 32}
              fill={i === 12 ? "var(--warn)" : "var(--accent)"} opacity="0.85"/>
          ))}
        </svg>
        <div className="artifact-foot mono">99.8% · 1 incident, 4m</div>
      </div>
    );
  };

  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">How it works</div>
            <h2 className="section-title">
              Five steps.<br />
              <span className="dim">Seven days, typically.</span>
            </h2>
          </div>
          <p className="section-sub">
            A predictable delivery rhythm — from first call to live system. You always know the next step.
          </p>
        </div>

        <ol className="steps">
          <div className="steps-track">
            <div className="steps-track-fill"></div>
          </div>
          {steps.map((s, i) => (
            <li key={i} className="step reveal" style={{"--delay": `${i * 0.08}s`}}>
              <div className="step-marker">
                <span className="step-dot"></span>
              </div>
              <div className="step-content">
                <div className="step-meta">
                  <span className="mono step-n">{s.n} · {s.label}</span>
                  <span className="mono step-dur">{s.dur}</span>
                </div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
              <div className="step-artifact">
                {renderArtifact(s.artifact)}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

window.HowItWorks = HowItWorks;
