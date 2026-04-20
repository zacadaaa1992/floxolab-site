const PROJECTS = [
  {
    id: "saas-onboarding",
    tag: "SaaS · Series A",
    title: "Replaced 6 internal tools with one onboarding flow",
    industry: "B2B SaaS · client details anonymized",
    before: [
      "Sales copy-paste from CRM to Notion",
      "Manual account setup across 4 dashboards",
      "Welcome email composed by hand",
      "Ops checks spreadsheet twice daily",
    ],
    after: [
      "Deal closed → account provisioned",
      "Personalized welcome sent in &lt;60s",
      "Customer success pinged in Slack",
      "Dashboard auto-populated from CRM",
    ],
    metrics: [
      { v: "~80%", l: "less manual ops time" },
      { v: "<1min", l: "new-account provisioning" },
      { v: "0", l: "missed steps since launch" },
    ],
  },
  {
    id: "ecommerce",
    tag: "E-commerce · DTC",
    title: "Invoice-to-books pipeline with AI categorization",
    industry: "DTC brand · client details anonymized",
    before: [
      "Stripe dashboards checked daily",
      "Bookkeeper manually categorizes",
      "Reconciliation at end of week",
      "Errors caught at month-end close",
    ],
    after: [
      "Payments stream into accounting in real time",
      "AI categorizes with high accuracy",
      "Anomalies flagged in Slack instantly",
      "Month-end close in hours, not days",
    ],
    metrics: [
      { v: "~30h", l: "/month of manual work freed" },
      { v: "~95%", l: "auto-categorization accuracy" },
      { v: "same-day", l: "book reconciliation" },
    ],
  },
  {
    id: "agency",
    tag: "Agency · content ops",
    title: "Content production pipeline with human-in-the-loop",
    industry: "Content agency · client details anonymized",
    before: [
      "Briefs live in email threads",
      "Writers assigned in Slack",
      "Review happens over DMs",
      "Publishing copied manually",
    ],
    after: [
      "Briefs in Notion trigger the flow",
      "AI drafts in the writer's voice",
      "Review queue with approve/reject",
      "One click to publish across channels",
    ],
    metrics: [
      { v: "2–3×", l: "output volume" },
      { v: "~40%", l: "lower cost per piece" },
      { v: "1-click", l: "multi-channel publish" },
    ],
  },
];

const Projects = () => {
  const [active, setActive] = React.useState(0);
  const p = PROJECTS[active];

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Selected work</div>
            <h2 className="section-title">
              Before / After.<br />
              <span className="dim">Real systems, real savings.</span>
            </h2>
          </div>
          <p className="section-sub">
            Three shipped projects. Click through to see what changed — on both sides of the ledger.
          </p>
        </div>

        <div className="projects-tabs">
          {PROJECTS.map((pr, i) => (
            <button key={pr.id} className={`projects-tab ${i === active ? "active" : ""}`} onClick={() => setActive(i)}>
              <span className="projects-tab-n mono">0{i+1}</span>
              <span className="projects-tab-t">{pr.tag}</span>
            </button>
          ))}
        </div>

        <article className="project-card" key={p.id}>
          <header className="project-head">
            <div>
              <div className="mono project-industry">{p.industry}</div>
              <h3 className="project-title">{p.title}</h3>
            </div>
            <a href="#contact" className="project-link mono">
              Request full case study
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </header>

          <div className="ba-grid">
            <div className="ba-col ba-before">
              <div className="ba-col-head">
                <span className="mono ba-label">BEFORE</span>
                <span className="ba-subtitle">Manual, brittle</span>
              </div>
              <ul className="ba-list">
                {p.before.map((item, i) => (
                  <li key={i} className="ba-item ba-item-before" style={{"--d": `${i * 0.05}s`}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>
                    </svg>
                    <span dangerouslySetInnerHTML={{__html: item}}></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ba-divider" aria-hidden="true">
              <svg viewBox="0 0 40 200" preserveAspectRatio="none">
                <path d="M4 10 L 36 100 L 4 190" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <div className="ba-col ba-after">
              <div className="ba-col-head">
                <span className="mono ba-label ba-label-accent">AFTER</span>
                <span className="ba-subtitle">Automated, observable</span>
              </div>
              <ul className="ba-list">
                {p.after.map((item, i) => (
                  <li key={i} className="ba-item ba-item-after" style={{"--d": `${i * 0.05 + 0.15}s`}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>
                    </svg>
                    <span dangerouslySetInnerHTML={{__html: item}}></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="project-metrics">
            {p.metrics.map((m, i) => (
              <div key={i} className="project-metric">
                <div className="project-metric-v mono">{m.v}</div>
                <div className="project-metric-l">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="project-note mono">
            * Metrics reflect approximate gains. Client names and specific numbers anonymized by request.
          </div>
        </article>
      </div>
    </section>
  );
};

window.Projects = Projects;
