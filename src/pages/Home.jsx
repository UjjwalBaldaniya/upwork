import { useState } from "react";
import { Link } from "react-router-dom";
import PhoneMock from "../components/PhoneMock.jsx";
import WaitlistForm from "../components/WaitlistForm.jsx";
import Reveal from "../components/Reveal.jsx";
import {
  APP_URL,
  MATCHING_THRESHOLD,
  appFeatures,
  faqs,
  howItWorks,
  playerFeatures,
  sportsTicker,
} from "../data/content.js";
import { copyAppLink, shareSpotflex } from "../lib/share.js";

const icons = ["⚡", "★", "◎", "🔒", "📍", "↔"];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);
  const [copied, setCopied] = useState(false);
  const ticker = [...sportsTicker, ...sportsTicker, ...sportsTicker];
  const qr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(APP_URL)}&bgcolor=fffaf4&color=7D9A74`;

  const copy = async () => {
    const ok = await copyAppLink();
    setCopied(ok);
  };

  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <Reveal>
            <p className="kicker">
              <span className="dot" />
              Now in beta · Ireland · <em>(but Cork first like ;-))</em>
            </p>
            <h1>
              Player drops out?
              <em>SpotFlex fills the gap.</em>
            </h1>
            <p className="lede">
              The last-minute player app for recreational sport. Post a spot. Get matched. Play tonight.
            </p>
            <div className="hero-actions">
              <Link to="/auth?mode=signup" className="btn btn-primary btn-lg">
                Sign up free
              </Link>
              <a href="#waitlist" className="btn btn-ghost btn-lg">
                Join the waitlist
              </a>
            </div>
            <div className="honest">
              <span className="badge">New & honest</span>
              <p>
                We unlock matching in your area at <strong>{MATCHING_THRESHOLD} signups</strong>. Founding members get first dibs.
              </p>
            </div>
          </Reveal>

          <Reveal className="hero-mosaic" delay={120}>
            <figure className="mosaic-main">
              <img
                src="/images/premium/padel-night.jpg"
                alt="Two padel players — one with a spot open, one ready to play. SpotFlex matches them."
              />
              <div className="mosaic-card">
                <span className="check">✓</span>
                <div>
                  <strong>Matched in minutes</strong>
                  <span>Cork · live spots near you</span>
                </div>
              </div>
            </figure>
            <figure className="mosaic-top">
              <img
                src="/images/premium/tennis-player.jpg"
                alt="Player ready to fill a last-minute tennis spot"
              />
            </figure>
            <figure className="mosaic-bot">
              <img
                src="/images/premium/padel-action.jpg"
                alt="Clay court from above — last-minute sport, close by"
              />
            </figure>
          </Reveal>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {ticker.map((s, i) => (
              <span key={`${s}-${i}`}>{s} ·</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="app">
        <div className="wrap">
          <Reveal className="center">
            <p className="eyebrow">The app</p>
            <h2>Find the open spot fast.</h2>
            <p className="sub">Fill your evening with real sport, close by.</p>
          </Reveal>

          <Reveal className="phone-stage" delay={80}>
            <PhoneMock
              className="side"
              src="/images/app-browse.png"
              alt="Browse spots"
              size="sm"
            />
            <PhoneMock
              className="featured"
              src="/images/app-home.png"
              alt="SpotFlex Home — live spots near you"
            />
            <PhoneMock
              className="side"
              src="/images/app-profile.png"
              alt="Player profile"
              size="sm"
            />
          </Reveal>

          <div className="app-grid">
            {appFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="app-card">
                <PhoneMock src={f.src} alt={f.alt} size="sm" />
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2>Three taps to a full game.</h2>
          </Reveal>
          <div className="steps">
            {howItWorks.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="step" as="article">
                <div className="step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">One app · two modes</p>
            <h2>Know which mode you're in — at a glance.</h2>
            <p className="sub">
              SpotFlex literally changes colour based on what you're doing. Posting spots? The whole app glows{" "}
              <strong style={{ color: "var(--red)" }}>red</strong>. Looking for spots? It glows{" "}
              <strong style={{ color: "var(--green)" }}>green</strong>. No more accidental taps, no more wondering who's organising whom.
            </p>
          </Reveal>
          <div className="modes">
            <Reveal className="mode mode-flex" delay={60} as="article">
              <p className="eyebrow">Flex Mode</p>
              <h3>Find spots.</h3>
              <p>Browse open games near you, claim a slot in seconds, and play tonight.</p>
              <div className="chips">
                <span>Browse</span>
                <span>Claim</span>
                <span>Play</span>
              </div>
            </Reveal>
            <Reveal className="mode mode-org" delay={140} as="article">
              <p className="eyebrow">Organiser Mode</p>
              <h3>Fill spots.</h3>
              <p>Post a dropped player in 20 seconds. Local Flex players see it instantly.</p>
              <div className="chips">
                <span>Post</span>
                <span>Match</span>
                <span>Confirm</span>
              </div>
            </Reveal>
          </div>
          <p className="switch-note">Switch modes anytime from your profile</p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">Built for casual players</p>
            <h2>Everything you need, nothing you don't.</h2>
          </Reveal>
          <div className="bento">
            {playerFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} as="article">
                <div className="ico">{icons[i]}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap crew">
          <Reveal>
            <p className="eyebrow">For everyone</p>
            <h2>Padel, 5-a-side, tag rugby — your crew, your call.</h2>
            <p className="sub">
              Built for anyone who plays. Lads, girls, mixed crews — if you're short a player or you're free tonight, SpotFlex matches you in minutes.
            </p>
          </Reveal>
          <Reveal delay={120} className="crew-photo">
            <img
              src="/images/premium/padel-night.jpg"
              alt="Two women on a padel court — one with a spot open, one ready to play."
            />
          </Reveal>
        </div>
      </section>

      <section className="section" id="waitlist" style={{ paddingTop: 20 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal className="center">
            <p className="eyebrow">Cold-start promise</p>
            <h2>No game tonight? You'll be first when one drops.</h2>
            <p className="sub">
              We don't pretend the app's full of games yet. We line up players sport-by-sport, area-by-area — and unlock matching the moment your patch hits {MATCHING_THRESHOLD}.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal className="center">
            <p className="eyebrow">FAQ</p>
            <h2>Quick answers.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="faq">
              {faqs.map((item, i) => (
                <article className="faq-item" key={item.q}>
                  <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {item.q}
                    <span className="plus">{openFaq === i ? "–" : "+"}</span>
                  </button>
                  {openFaq === i && <p>{item.a}</p>}
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="share-panel">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <Reveal>
            <p className="eyebrow">Share, like</p>
            <h2>
              Hey — share it, come on,<br />it's Cork like.
            </h2>
            <p className="sub">
              Spotflex only works if your mates are on it too. One tap, straight into the WhatsApp group, sorted.
            </p>
            <button className="btn btn-primary btn-lg" style={{ marginTop: 24 }} onClick={() => shareSpotflex("cork")}>
              Share Spotflex
            </button>
            <p className="sub" style={{ fontStyle: "italic", marginTop: 16 }}>
              Go on. The 5-a-side won't fill itself.
            </p>
          </Reveal>

          <Reveal delay={100} className="install">
            <img
              className="qr"
              src={qr}
              alt="QR code to open SpotFlex and install it on your phone"
            />
            <div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: "1.4rem" }}>
                Scan to install on your phone
              </h3>
              <p className="sub">
                Point your phone camera at the code. It opens SpotFlex in Chrome or Safari — then tap{" "}
                <strong>Install app</strong> and it lands on your home screen like any other app.
              </p>
              <button className="btn btn-ghost" style={{ marginTop: 14 }} onClick={copy}>
                {copied ? "Link copied" : "Copy link instead"}
              </button>
            </div>
          </Reveal>

          <Reveal delay={140} className="cta-band">
            <h2>Stop chasing players in the group chat.</h2>
            <p className="sub">Install the app, then sign up. Your next spot fills itself.</p>
            <div className="cta-row">
              <Link to="/auth?mode=signup" className="btn btn-primary btn-lg">
                Sign up free
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
