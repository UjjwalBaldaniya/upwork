import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Auth() {
  const [params] = useSearchParams();
  const signup = params.get("mode") !== "signin";
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [done, setDone] = useState("");

  const title = useMemo(
    () => (signup ? "Create your account" : "Welcome back"),
    [signup]
  );

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    setDone(
      signup
        ? "Account created on this preview. Connect your backend to go live."
        : "Signed in on this preview. Connect your backend to go live."
    );
  };

  return (
    <main className="auth-page">
      <div className="auth-split">
        <aside className="auth-visual">
          <img
            src={signup ? "/images/premium/tennis-player.jpg" : "/images/premium/padel-action.jpg"}
            alt="Players matching through SpotFlex"
          />
          <div className="auth-copy">
            <p className="eyebrow">
              SpotFlex
            </p>
            <h2>Post a spot. Get matched. Play tonight.</h2>
          </div>
        </aside>

        <section className="auth-form">
          <div className="form-card">
            <h1>{title}</h1>
            <p className="sub">
              {signup
                ? "Free during beta. Players never pay to find or fill a spot."
                : "The last-minute player app for recreational sport."}
            </p>

            <form className="stack" onSubmit={submit}>
              {signup && (
                <>
                  <label className="label" htmlFor="name">
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="field"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                  />
                  <label className="label" htmlFor="phone">
                    Phone (so others can reach you at the venue)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    className="field"
                    required
                    value={form.phone}
                    onChange={onChange}
                    placeholder="Phone number"
                  />
                  <p className="hint">
                    Required. Shared only with the organiser when you claim a spot, and with claimers of spots you post.{" "}
                    <Link to="/privacy">Read more</Link>
                  </p>
                </>
              )}

              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="field"
                required
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
              />

              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="field"
                required
                minLength={6}
                value={form.password}
                onChange={onChange}
                placeholder="Password"
              />

              <button className="btn btn-primary btn-lg" type="submit">
                {signup ? "Create Account" : "Sign In"}
              </button>
            </form>

            {done && <p className="note">{done}</p>}

            <p className="switch-auth">
              {signup ? (
                <>
                  Already have an account? <Link to="/auth?mode=signin">Sign in</Link>
                </>
              ) : (
                <>
                  New here? <Link to="/auth?mode=signup">Create an account</Link>
                </>
              )}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
