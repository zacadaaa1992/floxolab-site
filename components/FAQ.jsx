const FAQ = () => {
  const items = [
    {
      q: "Why n8n and not Zapier or Make?",
      a: "n8n is self-hostable, runs custom code, handles retries properly, and doesn't charge per-task. For anything beyond simple if-this-then-that, it's dramatically cheaper and more resilient. I'll use Zapier/Make when the job actually fits them — no religious wars.",
    },
    {
      q: "Do I need to have n8n set up already?",
      a: "No. I'll either deploy to your existing n8n instance, or spin up a self-hosted one on your infra, or set you up on n8n Cloud. The ongoing cost is usually $20–50/mo regardless of volume.",
    },
    {
      q: "What if something breaks after handoff?",
      a: "Every workflow ships with monitoring + alerts. Within the 30-day free window I'll fix anything. After that, you're either on a retainer or I charge a flat $150 per incident.",
    },
    {
      q: "How do we work together across time zones?",
      a: "Async-first. I keep daily written updates in Notion or Slack, send a Loom when something's ready to review, and guarantee at least a 2-hour live overlap window on weekdays. Most clients never need more than one weekly call.",
    },
    {
      q: "Can you train my team to maintain the workflows?",
      a: "Every delivery includes a video walkthrough and a written runbook. For teams that want more, I offer a 2-session onboarding that gets an in-house person comfortable making safe edits.",
    },
    {
      q: "What do you not do?",
      a: "Marketing automation sequences (that's an email specialist's job), UI/UX work, front-end development, and multi-month enterprise engagements. I'm focused on backend workflow automation.",
    },
  ];

  const [open, setOpen] = React.useState(0);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">FAQ</div>
            <h2 className="section-title">
              Questions I get often.<br />
              <span className="dim">Plain answers.</span>
            </h2>
          </div>
        </div>

        <div className="faq-list">
          {items.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-n mono">0{i+1}</span>
                <span className="faq-text">{it.q}</span>
                <span className="faq-toggle">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </span>
              </button>
              <div className="faq-a-wrap">
                <div className="faq-a">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.FAQ = FAQ;
