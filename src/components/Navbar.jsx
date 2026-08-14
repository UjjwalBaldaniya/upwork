import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const close = () => setOpen(false);

  return (
    <header className="nav-shell">
      <div className="nav-pill">
        <Logo />
        <nav className="nav-links" aria-label="Primary">
          {onHome ? (
            <>
              <a href="#app">The app</a>
              <a href="#how">How it works</a>
              <a href="#waitlist">Waitlist</a>
              <a href="#faq">FAQ</a>
            </>
          ) : (
            <NavLink to="/">Home</NavLink>
          )}
          <NavLink to="/privacy">Privacy</NavLink>
        </nav>
        <div className="nav-cta">
          <Link to="/auth?mode=signin" className="nav-login">
            Sign In
          </Link>
          <Link to="/auth?mode=signup" className="btn btn-primary">
            Sign up free
          </Link>
          <button
            className="icon-btn menu-btn"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        {onHome ? (
          <>
            <a href="#app" onClick={close}>The app</a>
            <a href="#how" onClick={close}>How it works</a>
            <a href="#waitlist" onClick={close}>Waitlist</a>
            <a href="#faq" onClick={close}>FAQ</a>
          </>
        ) : (
          <Link to="/" onClick={close}>Home</Link>
        )}
        <Link to="/privacy" onClick={close}>Privacy</Link>
        <Link to="/auth?mode=signin" onClick={close}>Sign In</Link>
      </div>
    </header>
  );
}
