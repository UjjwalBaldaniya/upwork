import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { CONTACT_EMAIL } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Logo />
        <nav>
          <Link to="/privacy">Privacy</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
          <Link to="/auth?mode=signin">Sign in</Link>
        </nav>
        <p>© {new Date().getFullYear()} SpotFlex</p>
      </div>
    </footer>
  );
}
