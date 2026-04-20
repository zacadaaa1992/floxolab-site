const Pricing = () => {
  const plans = [
    {
      n: "Audit",
      price: "Free",
      unit: "30 minutes",
      desc: "An honest review of your current process and concrete wins on the table.",
      features: [
        "Call + process mapping",
        "3 automation opportunities ranked",
        "Rough effort estimate",
        "No obligation, no slide deck",
      ],
      cta: "Book a call",
      highlight: false,
    },
    {
      n: "Single workflow",
      price: "from $300",
      unit: "fixed scope",
      desc: "One automation, end-to-end. From design to live, with 30 days of adjustments.",
      features: [
        "Simple integration (2–3 nodes): $300",
        "Mid-size workflow with AI: $500",
        "Complex multi-step system: $800",
        "Video walkthrough + docs",
        "30 days of free tweaks",
      ],
      cta: "Scope my workflow",
      highlight: true,
    },
    {
      n: "Ops partner",
      price: "$800",
      unit: "/ month",
      desc: "I become your automation team. New workflows, maintenance, incident response.",
      features: [
        "2 new workflows / month",
        "Monitoring + on-call",
        "Priority Slack / Telegram",
        "Monthly ops review",
        "Pause or cancel anytime",
      ],
      cta: "Start a retainer",
      highlight: false,
    },
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Pricing</div>
            <h2 className="section-title">
              Three ways to start.<br />
              <span className="dim">Fixed-scope, predictable.</span>
            </h2>
          </div>
          <p className="section-sub">
            No hourly billing, no surprises. Fixed prices tied to scope, paid 50% upfront / 50% on delivery.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div key={i} className={`pricing-card ${p.highlight ? "pricing-card-hl" : ""}`}>
              {p.highlight && <div className="pricing-badge mono">MOST COMMON</div>}
              <div className="pricing-head">
                <div className="pricing-n">{p.n}</div>
                <div className="pricing-price">
                  <span className="mono pricing-price-v">{p.price}</span>
                  <span className="pricing-price-u mono">{p.unit}</span>
                </div>
                <p className="pricing-desc">{p.desc}</p>
              </div>
              <ul className="pricing-features">
                {p.features.map((f, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12l5 5 9-12"/>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.highlight ? "btn-primary" : "btn-ghost"} pricing-cta`}>
                {p.cta}
                <svg className="btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Pricing = Pricing;
