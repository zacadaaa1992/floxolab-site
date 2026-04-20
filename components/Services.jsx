const Services = () => {
  const items = [
    {
      n: "01",
      title: "Sales & CRM automation",
      desc: "Lead capture → enrichment → routing → follow-ups. HubSpot, Pipedrive, or whatever you already use, wired to your real inbox.",
      tags: ["HubSpot", "Apollo", "Gmail", "Slack"],
      primary: true,
    },
    {
      n: "02",
      title: "AI-assisted back office",
      desc: "GPT & Claude inside your workflows — summaries, classification, drafting, data extraction from docs.",
      tags: ["OpenAI", "Claude", "Vector DB"],
      primary: true,
    },
    {
      n: "03",
      title: "Finance & operations",
      desc: "Invoicing, reconciliation, expense parsing, KPI dashboards. Quiet money plumbing that just works.",
      tags: ["Stripe", "Xero", "Sheets"],
      primary: true,
    },
    {
      n: "04",
      title: "Customer lifecycle",
      desc: "Onboarding, nudges, churn signals, winback. Emails and messaging bots that feel human.",
      tags: ["Email", "SMS", "Telegram"],
      primary: false,
    },
    {
      n: "05",
      title: "Content & publishing",
      desc: "Content pipelines from brief → generation → review → publish across Notion, Webflow, social.",
      tags: ["Notion", "Webflow", "Social"],
      primary: false,
    },
    {
      n: "06",
      title: "Custom integrations",
      desc: "Private APIs, scrapers, webhooks, retry logic, queues. The stuff that Zapier can't reach.",
      tags: ["Custom", "n8n", "Queues"],
      primary: false,
    },
  ];

  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? items : items.filter(it => it.primary);

  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head services-head">
          <div>
            <div className="section-eyebrow">Services</div>
            <h2 className="section-title">
              What I automate.<br />
              <span className="dim">Quietly. End-to-end.</span>
            </h2>
          </div>
          <p className="section-sub services-sub">
            Every workflow is custom-built in n8n and delivered as a maintained system — not a disposable Zap.
          </p>
        </div>

        <div className="services-grid">
          {visible.map((it, i) => (
            <article key={it.n} className="service-card reveal" style={{"--delay": `${i * 0.06}s`}}>
              <div className="service-head">
                <span className="service-n mono">{it.n}</span>
              </div>
              <h3 className="service-title">{it.title}</h3>
              <p className="service-desc">{it.desc}</p>
              <div className="service-tags">
                {it.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </article>
          ))}
        </div>

        <div className="services-more">
          <button className="services-more-btn" onClick={() => setExpanded(!expanded)}>
            <span className="mono">{expanded ? "SHOW LESS" : "SHOW 3 MORE"}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              style={{transform: expanded ? "rotate(180deg)" : "none", transition: "transform .25s"}}>
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

window.Services = Services;
