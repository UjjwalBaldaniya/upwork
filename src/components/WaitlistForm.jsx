import { useMemo, useState } from "react";
import {
  corkAreas,
  MATCHING_THRESHOLD,
  waitlistPerks,
  waitlistSports,
} from "../data/content.js";

export default function WaitlistForm() {
  const [sports, setSports] = useState([]);
  const [area, setArea] = useState("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const toggle = (name) => {
    setSports((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  };

  const areaLabel = useMemo(
    () => corkAreas.find((a) => a.key === area)?.label,
    [area]
  );

  const submit = (e) => {
    e.preventDefault();
    if (!sports.length || !area || !email) {
      window.dispatchEvent(
        new CustomEvent("spotflex:toast", {
          detail: "Pick a sport, area, and email first.",
        })
      );
      return;
    }
    const existing = JSON.parse(localStorage.getItem("spotflex-waitlist") || "[]");
    existing.push({ sports, area, email, at: Date.now() });
    localStorage.setItem("spotflex-waitlist", JSON.stringify(existing));
    setDone(true);
  };

  if (done) {
    return (
      <div className="success">
        <span className="founding">Founding member</span>
        <h3>You're on the list.</h3>
        <p className="sub" style={{ marginInline: "auto" }}>
          We'll text the second a game opens up near you
          {areaLabel ? ` in ${areaLabel}` : ""}. Matching unlocks at {MATCHING_THRESHOLD}{" "}
          signups in your patch.
        </p>
      </div>
    );
  }

  return (
    <form className="ticket" onSubmit={submit}>
      <div className="ticket-head">
        <div>
          <span className="founding">Founding member</span>
          <h3 style={{ fontFamily: "var(--display)", fontSize: "1.85rem", marginTop: 12, letterSpacing: "-0.03em" }}>
            Lock in your area before launch.
          </h3>
          <p className="sub">
            Tell us your sport and patch — we'll text the second a game opens up near you.
          </p>
        </div>
      </div>

      <div className="step-label">
        <span className="n-pill">1</span>
        Pick your sport(s)
      </div>
      <div className="sport-pills">
        {waitlistSports.map((s) => (
          <button
            type="button"
            key={s.name}
            className={sports.includes(s.name) ? "on" : ""}
            onClick={() => toggle(s.name)}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      <div className="step-label">
        <span className="n-pill">2</span>
        Your area in Cork
      </div>
      <select
        className="select"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      >
        <option value="">Select your area…</option>
        {corkAreas.map((a) => (
          <option key={a.key} value={a.key}>
            {a.label}
          </option>
        ))}
      </select>

      <div className="step-label">
        <span className="n-pill">3</span>
        Where do we reach you?
      </div>
      <div className="reach">
        <input
          className="field"
          type="email"
          required
          maxLength={255}
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Join waitlist
        </button>
      </div>

      <ul className="perks">
        {waitlistPerks.map((p) => (
          <li key={p}>✓ {p}</li>
        ))}
      </ul>
    </form>
  );
}
