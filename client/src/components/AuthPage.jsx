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

}