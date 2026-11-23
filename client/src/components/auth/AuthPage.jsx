import { useEffect, useState } from "react";
import "./AuthPage.css";

const iconPaths = {
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21v-2a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v2",
  mail: "M3 5h18v14H3zM3 5l9 7 9-7",
  lock: "M6 10h12v11H6zM8 10V6a4 4 0 0 1 8 0v4M12 14v3",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7ZM9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0",
  eyeOff:
    "m3 3 18 18M9.9 5.3A11 11 0 0 1 12 5c6 0 10 7 10 7a23 23 0 0 1-3.1 3.7M6.3 6.3A25 25 0 0 0 2 12s4 7 10 7a12 12 0 0 0 5.7-1.7M10 10a3 3 0 0 0 4 4",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  swap: "M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4",
  check: "m5 12 4 4L19 6",
};

function AuthIcon({ name, size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  autoComplete,
  minLength,
  onChange,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="auth-field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-input-wrap">
        <AuthIcon name="lock" />
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          minLength={minLength}
          onChange={onChange}
        />
        <button
          type="button"
          className="auth-password-toggle"
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
        >
          <AuthIcon name={visible ? "eyeOff" : "eye"} size={19} />
        </button>
      </div>
    </div>
  );
}


function getMode() {
  return window.location.hash === "#signup" ? "signup" : "login";
}

export default function AuthPage({ brand }) {
  const [mode, setMode] = useState(getMode);
  const [notice, setNotice] = useState("");
  const signup = mode === "signup";

  useEffect(() => {
    function handleNavigation() {
      setMode(getMode());
      setNotice("");
    }
    window.addEventListener("hashchange", handleNavigation);
    return () => window.removeEventListener("hashchange", handleNavigation);
  }, []);

  useEffect(() => {
    document.title = `${signup ? "Create account" : "Log in"} — AltLift`;
  }, [signup]);

  function clearValidation(event) {
    event.target.setCustomValidity("");
    const confirmation =
      event.target.form?.elements.namedItem("confirm-password");
    if (confirmation) confirmation.setCustomValidity("");
    setNotice("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    if (signup) {
      const password = form.elements.namedItem("password");
      const confirmation = form.elements.namedItem("confirm-password");
      if (password.value !== confirmation.value) {
        confirmation.setCustomValidity("Your passwords do not match.");
        confirmation.reportValidity();
        return;
      }
    }

    // Connect this handler to the server's authentication routes in the backend phase.
    // Do not save or log passwords in this frontend preview.
    setNotice(
      signup
        ? "Your form is ready. Account creation will be available once the backend is connected. No account has been created yet."
        : "Your form is ready. Sign-in will be available once the backend is connected. You have not been signed in yet.",
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-story" aria-label="About AltLift">
        <div className="auth-story-brand">{brand}</div>
        <div className="auth-story-copy">
          <p className="auth-eyebrow">
            <span />
            Less waiting. More lifting.
          </p>
          <h2>
            Your next chapter
            <br />
            <span>{signup ? "starts with a lift." : "starts right here."}</span>
          </h2>
          <p>
            Build a routine that adapts to your gym,
            <br className="auth-story-break" /> your equipment, and your goals.
          </p>
        </div>

        <div className="auth-art" aria-hidden="true">
          <div className="auth-orbit auth-orbit-one" />
          <div className="auth-orbit auth-orbit-two" />
          <div className="auth-plate">
            <div className="auth-plate-ridge">
              <span className="auth-plate-wordmark">ALTLIFT</span>
              <span className="auth-plate-weight">
                20<small>KG</small>
              </span>
              <div className="auth-plate-hole" />
              <span className="auth-plate-caption">KEEP IT MOVING</span>
            </div>
          </div>
          <div className="auth-art-label">
            <AuthIcon name="swap" size={18} />
            Same goal. Another way there.
          </div>
        </div>

        <footer className="auth-story-footer">
          <p>A different lift. The same momentum.</p>
          <span>Made for the way you actually train.</span>
        </footer>
      </section>

      <section className="auth-content" aria-labelledby="auth-heading">
        <header className="auth-topbar">
          <div className="auth-mobile-brand">{brand}</div>
          <span className="auth-preview-badge">
            <span />
            Account preview
          </span>
        </header>

        <div className={`auth-form-area ${signup ? "auth-signup" : ""}`}>
          <div className="auth-form-heading">
            <p className="auth-eyebrow">
              {signup ? "Start your journey" : "Good to have you back"}
            </p>
            <h1 id="auth-heading">
              {signup ? "Make room for progress." : "Welcome back."}
            </h1>
            <p>
              {signup
                ? "Create your AltLift account and keep your workout moving."
                : "Log in to pick up where you left off."}
            </p>
          </div>

          <form key={mode} onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="username">
                {signup ? "Username (user ID)" : "Username or email"}
              </label>
              <div className="auth-input-wrap">
                <AuthIcon name="user" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={
                    signup
                      ? "Choose a username"
                      : "Enter your username or email"
                  }
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck="false"
                  required
                  minLength={signup ? 3 : undefined}
                  maxLength={signup ? 24 : 254}
                  pattern={signup ? "[A-Za-z0-9._\\-]{3,24}" : ".*\\S.*"}
                  title={
                    signup
                      ? "Use 3–24 letters, numbers, periods, underscores, or hyphens."
                      : "Enter your username or email."
                  }
                  onChange={clearValidation}
                />
              </div>
            </div>

            {signup && (
              <div className="auth-field">
                <label htmlFor="email">Email</label>
                <div className="auth-input-wrap">
                  <AuthIcon name="mail" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck="false"
                    required
                    maxLength={254}
                    onChange={clearValidation}
                  />
                </div>
              </div>
            )}

            <PasswordField
              id="password"
              label="Password"
              placeholder={signup ? "Create a password" : "Enter your password"}
              autoComplete={signup ? "new-password" : "current-password"}
              minLength={signup ? 8 : undefined}
              onChange={clearValidation}
            />

            {signup && (
              <>
                <p className="auth-field-hint">
                  Use at least 8 characters and a password unique to AltLift.
                </p>
                <PasswordField
                  id="confirm-password"
                  label="Confirm password"
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  onChange={clearValidation}
                />
              </>
            )}

            {!signup && (
              <div className="auth-form-options">
                <label className="auth-remember">
                  <input type="checkbox" name="remember" />
                  Remember me
                </label>
                <button
                  type="button"
                  className="auth-text-button"
                  onClick={() =>
                    setNotice(
                      "Password reset will be available once account services are connected. No reset email has been sent.",
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="auth-submit">
              {signup ? "Create account" : "Log in"}
              <AuthIcon name="arrow" size={20} />
            </button>
            {notice && (
              <p className="auth-notice" role="status">
                {notice}
              </p>
            )}
          </form>

          <p className="auth-switch">
            {signup ? "Already have an account?" : "New to AltLift?"}{" "}
            <a href={signup ? "#login" : "#signup"}>
              {signup ? "Log in" : "Create an account"}
            </a>
          </p>

          <div className="auth-form-footer">
            <AuthIcon name={signup ? "check" : "swap"} size={19} />
            <p>
              {signup
                ? "Save your workouts and equipment in one place."
                : "Your saved workouts. Your equipment. Your next best move."}
            </p>
          </div>
          <p className="auth-preview-note">
            Frontend preview — sign-in and account creation aren’t connected
            yet.
          </p>
          <p className="auth-switch"><a href="#workout">Explore the workout preview →</a></p>
        </div>

        <footer className="auth-content-footer">
          AltLift / Your training space
        </footer>
      </section>
    </main>
  );

}