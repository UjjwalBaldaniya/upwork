import { privacy } from "../data/content.js";

export default function Privacy() {
  return (
    <main className="privacy-page">
      <div className="wrap">
        <p className="eyebrow">Legal</p>
        <h1>{privacy.title}</h1>
        <p className="lede">{privacy.intro}</p>

        <h2>What we store</h2>
        <ul>
          {privacy.store.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h2>Who can see what</h2>
        <div className="who">
          <article>
            <h3>Public to other signed-in users</h3>
            <p>Name, avatar, sports, role, reliability score and rough location.</p>
          </article>
          <article>
            <h3>Private — only you</h3>
            <p>
              <strong>Your email is never shared with other users.</strong> It's only visible to you on your profile.
            </p>
          </article>
          <article>
            <h3>Conditionally shared — your phone</h3>
            <p>Your phone is hidden by default. It is shared <strong>only</strong>:</p>
            <ul>
              <li>With the <strong>organiser</strong> of a spot, the moment <strong>you claim</strong> it.</li>
              <li>With a <strong>player</strong>, the moment <strong>they claim</strong> a spot you posted.</li>
            </ul>
            <p style={{ marginTop: 10 }}>
              If you release the claim or the game is cancelled, the phone is no longer visible to the other side.
            </p>
          </article>
        </div>

        <h2>Your consent</h2>
        <p>
          By adding a phone number to your profile and by claiming or posting a spot, you agree to this targeted sharing so the organiser and players can coordinate at the venue. Nobody else can see it.
        </p>

        <h2>How to remove your phone</h2>
        <p>
          Open <strong>Profile → Contact Phone</strong>, clear the field and tap Save. Your number is removed and won't be shared with anyone going forward.
        </p>

        <h2>How this is enforced</h2>
        <p>
          These rules aren't just hidden in the app — they're enforced on our servers. Other users literally cannot read your email or phone, even with developer tools, unless the conditions above are met.
        </p>
      </div>
    </main>
  );
}
