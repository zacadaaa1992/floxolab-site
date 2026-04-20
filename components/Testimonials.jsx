const TESTIMONIALS = [
  {
    q: "Shipped our lead-routing system in four days. Our reps stopped copying and started selling. The Loom walkthroughs alone were worth the fee.",
    n: "Marco D.",
    r: "Head of Growth, Finmex",
    avatar: "MD",
  },
  {
    q: "I've worked with automation agencies before. This was the first time I felt I was getting a system, not a rental. Clear scope, clear handoff, calm.",
    n: "Anya S.",
    r: "COO, Lattico",
    avatar: "AS",
  },
  {
    q: "The before/after audit was so sharp we gave the green light in 20 minutes. Two months in, three workflows live, zero incidents.",
    n: "James R.",
    r: "Founder, Sparkloop Co.",
    avatar: "JR",
  },
  {
    q: "Quiet technical craft. The monitoring dashboard alone has paid for itself twice. I don't think about the automations anymore — they just run.",
    n: "Priya V.",
    r: "Ops Lead, Helmwise",
    avatar: "PV",
  },
];

const Testimonials = () => {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">What clients say</div>
            <h2 className="section-title">
              Nice words,<br />
              <span className="dim">from people who pay on time.</span>
            </h2>
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="testimonial">
              <svg className="testimonial-quote" width="20" height="14" viewBox="0 0 32 22" fill="currentColor">
                <path d="M10.5 0H3.5C1.6 0 0 1.6 0 3.5v7c0 1.9 1.6 3.5 3.5 3.5h3.3c-.2 2.3-1.5 4-3.8 4.9v2.1c5.6-.5 10.5-4.4 10.5-10.5V3.5C13.5 1.6 12 0 10.5 0zm18 0h-7C19.6 0 18 1.6 18 3.5v7c0 1.9 1.6 3.5 3.5 3.5h3.3c-.2 2.3-1.5 4-3.8 4.9v2.1c5.6-.5 10.5-4.4 10.5-10.5V3.5C31.5 1.6 30 0 28.5 0z"/>
              </svg>
              <blockquote className="testimonial-q">{t.q}</blockquote>
              <figcaption className="testimonial-foot">
                <div className="testimonial-avatar mono">{t.avatar}</div>
                <div>
                  <div className="testimonial-n">{t.n}</div>
                  <div className="testimonial-r mono">{t.r}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

window.Testimonials = Testimonials;
