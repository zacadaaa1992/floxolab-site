const LOGOS = [
  { n: "HubSpot", icon: "HS" },
  { n: "Stripe", icon: "||" },
  { n: "Notion", icon: "N" },
  { n: "Slack", icon: "#" },
  { n: "Telegram", icon: "T" },
  { n: "Gmail", icon: "@" },
  { n: "Typeform", icon: "≡" },
  { n: "Airtable", icon: "◆" },
  { n: "WooCommerce", icon: "W" },
  { n: "Make", icon: "M" },
  { n: "Zapier", icon: "Z" },
  { n: "n8n", icon: "∞" },
  { n: "OpenAI", icon: "✦" },
  { n: "Claude", icon: "◊" },
  { n: "Supabase", icon: "⚡" },
  { n: "Google Sheets", icon: "▦" },
];

const LogoMarquee = () => {
  const row = [...LOGOS, ...LOGOS];
  return (
    <section className="marquee-section">
      <div className="container marquee-head-wrap">
        <div className="marquee-head">
          <span className="mono marquee-label">// WHAT I CONNECT</span>
          <span className="muted marquee-desc">40+ services wired daily across client stacks</span>
        </div>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((l, i) => (
            <div key={i} className="marquee-item">
              <span className="marquee-icon mono">{l.icon}</span>
              <span className="marquee-name">{l.n}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="marquee marquee-reverse">
        <div className="marquee-track">
          {row.reverse().map((l, i) => (
            <div key={i} className="marquee-item marquee-item-muted">
              <span className="marquee-icon mono">{l.icon}</span>
              <span className="marquee-name">{l.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

window.LogoMarquee = LogoMarquee;
