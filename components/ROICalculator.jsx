const ROICalculator = () => {
  const [hours, setHours] = React.useState(10);
  const [rate, setRate] = React.useState(35);
  const [tasks, setTasks] = React.useState(3);

  const weekSaved = Math.round(hours * 0.75);
  const monthSaved = weekSaved * 4;
  const moneySaved = monthSaved * rate;
  const yearSaved = moneySaved * 12;
  const roiMonths = moneySaved > 0 ? Math.max(1, Math.round(500 / moneySaved * 10) / 10) : "—";

  const fmt = (n) => n >= 1000 ? `$${(n/1000).toFixed(1)}k` : `$${n}`;

  return (
    <section className="section roi-section" id="roi">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-eyebrow">ROI Calculator</div>
            <h2 className="section-title">
              How much is manual work<br />
              <span className="dim">actually costing you?</span>
            </h2>
          </div>
          <p className="section-sub">
            Adjust the sliders to see your real monthly loss from repetitive tasks — and how quickly automation pays for itself.
          </p>
        </div>

        <div className="roi-grid">
          <div className="roi-controls reveal">
            <div className="roi-field">
              <div className="roi-field-head">
                <span className="roi-label">Hours/week on repetitive tasks</span>
                <span className="roi-val mono">{hours}h</span>
              </div>
              <input
                type="range" min="1" max="40" step="1"
                value={hours}
                onChange={e => setHours(+e.target.value)}
                className="roi-slider"
              />
              <div className="roi-scale mono"><span>1h</span><span>40h</span></div>
            </div>

            <div className="roi-field">
              <div className="roi-field-head">
                <span className="roi-label">Your hourly cost (salary or rate)</span>
                <span className="roi-val mono">${rate}/hr</span>
              </div>
              <input
                type="range" min="10" max="200" step="5"
                value={rate}
                onChange={e => setRate(+e.target.value)}
                className="roi-slider"
              />
              <div className="roi-scale mono"><span>$10</span><span>$200</span></div>
            </div>

            <div className="roi-field">
              <div className="roi-field-head">
                <span className="roi-label">Number of people doing these tasks</span>
                <span className="roi-val mono">{tasks} {tasks === 1 ? "person" : "people"}</span>
              </div>
              <input
                type="range" min="1" max="20" step="1"
                value={tasks}
                onChange={e => setTasks(+e.target.value)}
                className="roi-slider"
              />
              <div className="roi-scale mono"><span>1</span><span>20</span></div>
            </div>

            <div className="roi-note mono">
              * Assumes 75% of task hours are automatable. Conservative estimate.
            </div>
          </div>

          <div className="roi-results reveal" style={{"--delay": "0.1s"}}>
            <div className="roi-result-card roi-result-main">
              <div className="roi-result-label mono">MONTHLY SAVINGS</div>
              <div className="roi-result-value mono">{fmt(moneySaved * tasks)}</div>
              <div className="roi-result-sub">{monthSaved * tasks}h freed per month</div>
            </div>

            <div className="roi-results-row">
              <div className="roi-result-card">
                <div className="roi-result-label mono">ANNUAL SAVINGS</div>
                <div className="roi-result-value roi-result-value-sm mono">{fmt(yearSaved * tasks)}</div>
              </div>
              <div className="roi-result-card">
                <div className="roi-result-label mono">ROI PAYBACK</div>
                <div className="roi-result-value roi-result-value-sm mono">{roiMonths}mo</div>
                <div className="roi-result-sub">on $500 workflow</div>
              </div>
            </div>

            <div className="roi-cta-block">
              <div className="roi-cta-text">
                You're losing <strong>{fmt(moneySaved * tasks)}/mo</strong> to manual work. A single workflow costs from $300.
              </div>
              <a href="#contact" className="btn btn-primary roi-cta">
                Get a free audit
                <svg className="btn-arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

window.ROICalculator = ROICalculator;
