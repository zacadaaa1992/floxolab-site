const AI_RESPONSES = {
  default: "That's a great starting point. What tools are you currently using — anything like HubSpot, Notion, Slack, or Google Sheets?",
  greet: "Hey! What's the most repetitive thing eating your time right now? I can usually spot an automation fix in the first few minutes.",
  pricing: "A single workflow starts at $300, and most clients are live within 3–7 days. For ongoing support, the retainer is $800/mo. Want me to sketch out what your specific setup would cost?",
  howlong: "Most workflows go live in 3–7 days:\n• Day 0: Free audit call\n• Day 1: Blueprint & scope\n• Day 2–5: Build & test\n• Day 6–7: Go live + handoff\n\nSimple integrations can ship in 2–3 days. What are you trying to automate?",
  whatcanido: "Here's what I build most often:\n• Lead capture → CRM → Slack/Telegram alert\n• Invoice intake → AI categorize → accounting\n• Content brief → AI draft → publish\n• Client onboarding across 4+ tools\n• Email triage: Gmail → AI classify → route\n\nWhat does your current process look like?",
  n8n: "n8n is self-hosted, handles retries properly, runs custom code, and has no per-task fees like Zapier. You own the system — it runs on your infra, costs ~$10–20/mo for hosting.",
  contact: "Easiest way to start: fill out the contact form below ↓ or ping me on Telegram @zacadaaa1992. I reply within 6h on weekdays.",
};

const QUICK_QUESTIONS = [
  { label: "What can you automate?", key: "whatcanido" },
  { label: "How much does it cost?", key: "pricing" },
  { label: "How long does it take?", key: "howlong" },
  { label: "Why n8n?", key: "n8n" },
  { label: "How do I start?", key: "contact" },
];

const N8N_WEBHOOK_URL = "https://n8n.floxolab.com/webhook/ai-chat";
const MAX_MSG_LENGTH = 800;
const RATE_LIMIT_MS = 2000;
const MAX_MESSAGES = 40;

const AIChat = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: "ai", text: "Hey! 👋 Ask me anything about automation — or pick a quick question below." }
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [unread, setUnread] = React.useState(1);
  const [inputError, setInputError] = React.useState("");
  const [offerEmail, setOfferEmail] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState("");
  const [emailSending, setEmailSending] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);
  const [userHasSent, setUserHasSent] = React.useState(false);
  const lastSentAt = React.useRef(0);
  const bodyRef = React.useRef(null);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open, offerEmail]);

  React.useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 80);
    }
  }, [open]);

  const getStaticResponse = (text) => {
    const t = text.toLowerCase();
    if (t.includes("price") || t.includes("cost") || t.includes("much") || t.includes("$")) return AI_RESPONSES.pricing;
    if (t.includes("long") || t.includes("fast") || t.includes("days") || t.includes("time")) return AI_RESPONSES.howlong;
    if (t.includes("n8n") || t.includes("zapier") || t.includes("make") || t.includes("why")) return AI_RESPONSES.n8n;
    if (t.includes("start") || t.includes("contact") || t.includes("book") || t.includes("call")) return AI_RESPONSES.contact;
    if (t.includes("automate") || t.includes("what") || t.includes("can you") || t.includes("do you")) return AI_RESPONSES.whatcanido;
    if (t.includes("hi") || t.includes("hello") || t.includes("hey")) return AI_RESPONSES.greet;
    return AI_RESPONSES.default;
  };

  const validate = (text) => {
    if (!text.trim()) return "Please type a message first.";
    if (text.trim().length < 2) return "Message is too short.";
    if (text.length > MAX_MSG_LENGTH) return `Max ${MAX_MSG_LENGTH} characters.`;
    if (messages.length >= MAX_MESSAGES) return "Chat limit reached. Refresh to start a new session.";
    const now = Date.now();
    if (now - lastSentAt.current < RATE_LIMIT_MS) return "Please wait a moment before sending again.";
    return null;
  };

  const sendMessage = async (text) => {
    const err = validate(text);
    if (err) { setInputError(err); setTimeout(() => setInputError(""), 3000); return; }
    if (loading) return;

    setInputError("");
    setOfferEmail(false);
    setUserHasSent(true);
    lastSentAt.current = Date.now();
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.slice(-10);
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      const reply = (data.reply || "").trim();
      setMessages(prev => [...prev, { role: "ai", text: reply || getStaticResponse(text) }]);
      if (data.offer_email) setOfferEmail(true);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: getStaticResponse(text) }]);
    }
    setLoading(false);
  };

  const sendEmailPlan = async () => {
    if (!emailInput.trim() || !/\S+@\S+\.\S+/.test(emailInput)) {
      setInputError("Please enter a valid email address.");
      setTimeout(() => setInputError(""), 3000);
      return;
    }
    setEmailSending(true);
    setInputError("");
    try {
      const history = messages.slice(-10);
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `My email is ${emailInput}. Please send me the plan.`, history }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.email_sent) {
        setEmailSent(true);
        setOfferEmail(false);
        setMessages(prev => [...prev, { role: "ai", text: `Sent! Check ${emailInput} — you should have the plan in a minute. Any questions, I'm here.` }]);
      } else {
        const reply = (data.reply || "").trim();
        if (reply) setMessages(prev => [...prev, { role: "ai", text: reply }]);
        setOfferEmail(false);
      }
    } catch {
      setInputError("Couldn't send. Try again or email hello@floxolab.com directly.");
      setTimeout(() => setInputError(""), 4000);
    }
    setEmailSending(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputError(val.length > MAX_MSG_LENGTH ? `Max ${MAX_MSG_LENGTH} chars (${val.length}/${MAX_MSG_LENGTH})` : "");
    setInput(val.slice(0, MAX_MSG_LENGTH));
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  return (
    <>
      <button
        className={`aichat-fab ${open ? "aichat-fab-open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Chat with FloxoLab AI"}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
        {!open && unread > 0 && <span className="aichat-badge">{unread}</span>}
      </button>

      {open && (
        <div className="aichat-window">

          <div className="aichat-head">
            <div className="aichat-avatar mono">FX</div>
            <div>
              <div className="aichat-name">FloxoLab</div>
              <div className="aichat-status mono">
                <span className="aichat-dot"></span>
                ONLINE · usually replies fast
              </div>
            </div>
          </div>

          <div className="aichat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`aichat-msg aichat-msg-${m.role}`}>
                {m.text.split("\n").map((line, j) => (
                  <React.Fragment key={j}>{line}{j < m.text.split("\n").length - 1 && <br/>}</React.Fragment>
                ))}
              </div>
            ))}
            {loading && (
              <div className="aichat-msg aichat-msg-ai aichat-typing">
                <span></span><span></span><span></span>
              </div>
            )}
            {offerEmail && !emailSent && (
              <div className="aichat-email-offer">
                <div className="aichat-email-offer-label mono">SEND PLAN TO EMAIL</div>
                <div className="aichat-email-offer-row">
                  <input
                    className="aichat-input aichat-email-input"
                    type="email"
                    placeholder="your@email.com"
                    value={emailInput}
                    onChange={e => setEmailInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendEmailPlan()}
                    disabled={emailSending}
                  />
                  <button className="aichat-send aichat-send-email" onClick={sendEmailPlan} disabled={emailSending || !emailInput.trim()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {!userHasSent && (
            <div className="aichat-quick">
              {QUICK_QUESTIONS.map((q) => (
                <button key={q.key} className="aichat-quick-btn" onClick={() => sendMessage(q.label)}>
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <div className="aichat-foot">
            {inputError && <div className="aichat-input-error mono">{inputError}</div>}
            <div className="aichat-foot-row">
              <input
                ref={inputRef}
                className={`aichat-input${inputError ? " aichat-input-invalid" : ""}`}
                placeholder="Ask anything about automation..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKey}
                disabled={loading}
                maxLength={MAX_MSG_LENGTH}
              />
              <button className="aichat-send" onClick={() => sendMessage(input)} disabled={loading || !input.trim()}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            {input.length > 600 && (
              <div className="aichat-char-count mono">{input.length}/{MAX_MSG_LENGTH}</div>
            )}
          </div>

        </div>
      )}
    </>
  );
};

window.AIChat = AIChat;
