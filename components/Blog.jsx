const POSTS = [
  {
    tag: "Guide",
    date: "Apr 2026",
    title: "Why n8n beats Zapier for serious automation",
    desc: "Self-hosted, custom code, proper retry logic, and no per-task pricing. Here's when to use each — and when n8n wins by default.",
    mins: "6 min read",
    slug: "#blog",
  },
  {
    tag: "Case Study",
    date: "Mar 2026",
    title: "How we cut onboarding time from 4 hours to 4 minutes",
    desc: "A B2B SaaS team was manually provisioning accounts across four tools. One n8n workflow changed that — and shipped in five days.",
    mins: "4 min read",
    slug: "#blog",
  },
  {
    tag: "Tutorial",
    date: "Mar 2026",
    title: "AI categorization inside your accounting workflow",
    desc: "Using Claude or GPT to auto-categorize Stripe payments before they hit your books. Step-by-step, with the actual n8n nodes.",
    mins: "8 min read",
    slug: "#blog",
  },
];

const Blog = () => {
  return (
    <section className="section blog-section" id="blog">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">Insights</div>
            <h2 className="section-title">
              From the build log.<br />
              <span className="dim">Practical automation writing.</span>
            </h2>
          </div>
          <p className="section-sub">
            No fluff, no slide decks. Real patterns from real projects.
          </p>
        </div>

        <div className="blog-grid">
          {POSTS.map((p, i) => (
            <article key={i} className="blog-card reveal" style={{"--delay": `${i * 0.07}s`}}>
              <div className="blog-card-top">
                <span className="blog-tag mono">{p.tag}</span>
                <span className="blog-date mono">{p.date}</span>
              </div>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-desc">{p.desc}</p>
              <div className="blog-foot">
                <span className="blog-mins mono">{p.mins}</span>
                <a href={p.slug} className="blog-link mono">
                  Read →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-bottom">
          <span className="mono blog-coming">More posts coming soon · </span>
          <a href="#contact" className="mono blog-notify">Get notified →</a>
        </div>
      </div>
    </section>
  );
};

window.Blog = Blog;
