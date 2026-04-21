const About = () => {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="section-eyebrow">Operator</div>
            <h2 className="section-title">
              One operator.<br/>
              One inbox.<br/>
              <span className="dim">Zero middlemen.</span>
            </h2>
            <div className="about-copy">
              <p>
                I started FloxoLab because I kept seeing small teams pay agencies
                four-figure retainers for automations they could own outright —
                and get back brittle Zaps that broke the first time something
                unexpected happened.
              </p>
              <p>
                I work solo, scope tightly, and build every workflow as a system
                you own — in n8n, on your infra, with monitoring and docs from
                day one. No account managers, no reselling, no lock-in.
              </p>
              <p>
                If you can describe the boring part of your week in three sentences,
                I can probably automate it before the weekend.
              </p>
            </div>

            <div className="about-profile">
              <div className="about-avatar mono">FX</div>
              <div>
                <div className="about-name">FloxoLab</div>
                <div className="mono about-role">Automation engineer · Philippines · async worldwide</div>
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="stack-card">
              <div className="stack-card-head">
                <span className="mono stack-label">STACK</span>
                <span className="mono stack-v">v2026.04</span>
              </div>
              <div className="stack-list">
                {[
                  ["Orchestration", "n8n · Make · Temporal"],
                  ["LLMs", "OpenAI · Claude · Local Ollama"],
                  ["CRM / Ops", "HubSpot · Attio · Pipedrive"],
                  ["Finance", "Stripe · Xero · QuickBooks"],
                  ["Messaging", "Slack · Telegram · Postmark"],
                  ["Data", "Supabase · Airtable · Sheets"],
                  ["Infra", "Docker · Railway · Hetzner"],
                ].map(([k, v], i) => (
                  <div key={i} className="stack-row">
                    <span className="mono stack-k">{k}</span>
                    <span className="stack-v-text">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="principles">
              <div className="mono principles-label">PRINCIPLES</div>
              <div className="principles-list">
                <div className="principle">Fixed scope over hourly billing</div>
                <div className="principle">Docs over Slack chatter</div>
                <div className="principle">Observability from day one</div>
                <div className="principle">Simple before clever</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.About = About;
