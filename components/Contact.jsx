const Contact = () => {
  const [form, setForm] = React.useState({ name: "", email: "", stack: "", budget: "" });
  const [sent, setSent] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (form.name && form.email) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="section-eyebrow">Let's talk</div>
            <h2 className="contact-title">
              Tell me what's eating<br/>
              <span className="dim">your week.</span>
            </h2>
            <p className="contact-sub">
              30-minute call. I'll walk away with three concrete automation wins
              and a quote on the table — or honestly tell you this isn't a fit.
            </p>

            <div className="contact-meta">
              <div className="contact-meta-row">
                <span className="mono contact-meta-k">EMAIL</span>
                <a href="mailto:hello@floxolab.com" className="contact-meta-v">hello@floxolab.com</a>
              </div>
              <div className="contact-meta-row">
                <span className="mono contact-meta-k">TELEGRAM</span>
                <a href="#" className="contact-meta-v">@floxolab</a>
              </div>
              <div className="contact-meta-row">
                <span className="mono contact-meta-k">RESPONSE</span>
                <span className="contact-meta-v">&lt; 6h on weekdays</span>
              </div>
              <div className="contact-meta-row">
                <span className="mono contact-meta-k">TIMEZONE</span>
                <span className="contact-meta-v">UTC+8 · Philippines · async-friendly</span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <div className="form-head">
              <span className="mono form-label">NEW PROJECT BRIEF</span>
              <span className="mono form-status">
                <span className="form-status-dot"></span>
                ACCEPTING · 2 SLOTS
              </span>
            </div>

            <label className="field">
              <span className="field-label mono">NAME</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                placeholder="Jane Doe"
                required
              />
            </label>

            <label className="field">
              <span className="field-label mono">WORK EMAIL</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                placeholder="jane@company.com"
                required
              />
            </label>

            <label className="field">
              <span className="field-label mono">YOUR STACK</span>
              <input
                type="text"
                value={form.stack}
                onChange={(e) => setForm({...form, stack: e.target.value})}
                placeholder="HubSpot, Notion, Stripe..."
              />
            </label>

            <label className="field">
              <span className="field-label mono">BUDGET RANGE</span>
              <div className="budget-opts">
                {["< $500", "$500–1k", "$1–3k", "Retainer"].map((b) => (
                  <button
                    key={b}
                    type="button"
                    className={`budget-opt ${form.budget === b ? "active" : ""}`}
                    onClick={() => setForm({...form, budget: b})}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </label>

            <button type="submit" className="btn btn-primary form-submit">
              {sent ? "Sent · I'll reply within 6h" : "Send brief"}
              {!sent && (
                <svg className="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="container footer">
        <div className="footer-row">
          <div className="nav-logo">
            <div className="nav-logo-mark"></div>
            floxolab.com
          </div>
          <div className="footer-links mono">
            <a href="#projects">Projects</a>
            <a href="#how-it-works">Process</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="mono footer-meta">
            © 2026 · Built in n8n. Obviously.
          </div>
        </div>
      </div>
    </section>
  );
};

window.Contact = Contact;
