const Metrics = () => {
  const [vals, setVals] = React.useState({ hours: 0, runs: 0, rate: 0, clients: 0 });
  const ref = React.useRef(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const o = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const targets = { hours: 14200, runs: 1.2, rate: 99.4, clients: 38 };
        const dur = 1800;
        const start = Date.now();
        const tick = () => {
          const p = Math.min(1, (Date.now() - start) / dur);
          const ease = 1 - Math.pow(1 - p, 3);
          setVals({
            hours: Math.round(targets.hours * ease),
            runs: +(targets.runs * ease).toFixed(1),
            rate: +(targets.rate * ease).toFixed(1),
            clients: Math.round(targets.clients * ease),
          });
          if (p < 1) requestAnimationFrame(tick);
        };
        tick();
      }
    }, { threshold: 0.3 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const cards = [
    { v: vals.hours.toLocaleString(), unit: "hrs", l: "annual manual work replaced" },
    { v: vals.runs.toFixed(1), unit: "M", l: "workflow runs executed" },
    { v: vals.rate.toFixed(1), unit: "%", l: "system uptime across clients" },
    { v: vals.clients.toString(), unit: "", l: "businesses live on systems I built" },
  ];

  return (
    <section className="section metrics-section" ref={ref} id="metrics">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">By the numbers</div>
            <h2 className="section-title">
              Aggregate impact.<br />
              <span className="dim">Across every live client system.</span>
            </h2>
          </div>
          <p className="section-sub">
            Numbers pulled from monitoring dashboards across all active workflows. Updated monthly.
          </p>
        </div>

        <div className="metrics-grid">
          {cards.map((c, i) => (
            <div key={i} className="metric-card">
              <div className="metric-v">
                <span className="mono metric-n">{c.v}</span>
                <span className="metric-unit mono">{c.unit}</span>
              </div>
              <div className="metric-l">{c.l}</div>
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{animationDelay: `${i * 0.15}s`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Metrics = Metrics;
