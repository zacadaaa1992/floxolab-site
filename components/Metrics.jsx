const Metrics = () => {
  const ref = React.useRef(null);

  const cards = [
    { v: "15+", unit: "", l: "workflows shipped to production" },
    { v: "20+", unit: "", l: "integrations wired up" },
    { v: "3–7d", unit: "", l: "typical delivery time" },
    { v: "100%", unit: "", l: "projects delivered on time" },
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
