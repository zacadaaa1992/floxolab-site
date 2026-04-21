const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 160,
  "animIntensity": 5
} /*EDITMODE-END*/;

const App = () => {
  const [tweakOpen, setTweakOpen] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  // Apply tweaks to document
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", `oklch(0.72 0.14 ${tweaks.accentHue})`);
    document.documentElement.style.setProperty("--accent-dim", `oklch(0.72 0.14 ${tweaks.accentHue} / 0.15)`);
    document.documentElement.style.setProperty("--accent-line", `oklch(0.72 0.14 ${tweaks.accentHue} / 0.35)`);
    document.documentElement.dataset.animIntensity = tweaks.animIntensity;
  }, [tweaks]);

  // Edit mode messaging
  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweakOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweakOpen(false);
    };
    window.addEventListener("message", handler);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handler);
  }, []);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: { [k]: v } }, "*");
  };

  // Scroll progress bar + scroll-to-top + mobile menu
  React.useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const top = document.getElementById("scroll-top");
    const burger = document.getElementById("nav-burger");
    const links = document.getElementById("nav-links");

    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (scrolled / total * 100) + "%";
      if (top) top.classList.toggle("visible", scrolled > 400);
      const nav = document.getElementById("main-nav");
      if (nav) nav.classList.toggle("nav-scrolled", scrolled > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    if (burger && links) {
      burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        links.classList.toggle("open");
      });
      links.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          burger.classList.remove("active");
          links.classList.remove("open");
        });
      });
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reveal on scroll
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
        }
      });
    }, { threshold: 0.15 });
    const observe = () => {
      document.querySelectorAll(".reveal, .steps").forEach((el) => obs.observe(el));
    };
    observe();
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {obs.disconnect();mo.disconnect();};
  }, []);

  const hues = [
  { v: 160, l: "emerald" },
  { v: 140, l: "green" },
  { v: 85, l: "amber" },
  { v: 25, l: "ember" },
  { v: 230, l: "azure" },
  { v: 290, l: "violet" }];


  return (
    <>
      <div className="scroll-progress-bar" id="scroll-progress"></div>

      <nav className="nav" id="main-nav">
        <div className="container nav-inner">
          <a href="#" className="nav-logo">
            <div className="nav-logo-mark"></div>
            floxolab.com
          </a>
          <div className="nav-links" id="nav-links">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#how-it-works">Process</a>
            <a href="#roi">ROI</a>
            <a href="#faq">FAQ</a>
            <a href="#contact" className="btn btn-primary nav-cta">Let's talk</a>
          </div>
          <button className="nav-burger" id="nav-burger" aria-label="Menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <Hero />
      <LogoMarquee />
      <Services />
      <HowItWorks />
      <Demo />
      <Projects />
      <Metrics />
      <ROICalculator />
      <Pricing />
      <FAQ />
      <About />
      <Blog />
      <Contact />
      <AIChat />

      <button className="scroll-top" id="scroll-top" aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {tweakOpen &&
      <div className="tweak-panel">
          <div className="tweak-head">
            <span className="mono tweak-title">TWEAKS</span>
            <button className="tweak-close" onClick={() => setTweakOpen(false)}>✕</button>
          </div>
          <div className="tweak-group">
            <div className="mono tweak-label">ACCENT COLOR</div>
            <div className="tweak-hues">
              {hues.map((h) =>
            <button
              key={h.v}
              className={`tweak-hue ${tweaks.accentHue === h.v ? "active" : ""}`}
              style={{ background: `oklch(0.72 0.14 ${h.v})` }}
              onClick={() => update("accentHue", h.v)}
              title={h.l}>
            </button>
            )}
            </div>
          </div>
          <div className="tweak-group">
            <div className="mono tweak-label">ANIMATION INTENSITY · {tweaks.animIntensity}</div>
            <input
            type="range"
            min="1" max="10" step="1"
            value={tweaks.animIntensity}
            onChange={(e) => update("animIntensity", +e.target.value)}
            className="tweak-slider" />
          
            <div className="tweak-scale mono">
              <span>calm</span><span>wild</span>
            </div>
          </div>
        </div>
      }
    </>);

};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);