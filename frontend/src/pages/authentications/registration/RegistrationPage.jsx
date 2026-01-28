import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/account/registration/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, password2 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data && typeof data === "object") {
          setFieldErrors(data);
        } else {
          setFormError("Ошибка регистрации");
        }
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/login", { replace: true });
    } catch (err) {
      setFormError("Сервер недоступен");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page-card">
        <h1>Talky</h1>
        <h2>Создайте аккаунт</h2>

        {formError ? <p className="form-error">{formError}</p> : null}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <span className="field-label">Придумайте никнейм</span>
            <input
              id="username"
              type="text"
              placeholder="Никнейм"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            {fieldErrors.username ? (
              <p className="field-error">{String(fieldErrors.username)}</p>
            ) : null}
          </label>

          <label htmlFor="password">
            <span className="field-label">Придумайте пароль</span>
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {fieldErrors.password ? (
              <p className="field-error">{String(fieldErrors.password)}</p>
            ) : null}
          </label>

          <label htmlFor="password2">
            <span className="field-label">Подтвердите пароль</span>
            <input
              id="password2"
              type="password"
              placeholder="Подтвердите пароль"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              autoComplete="new-password"
            />
            {fieldErrors.password2 ? (
              <p className="field-error">{String(fieldErrors.password2)}</p>
            ) : null}
          </label>

          {fieldErrors.non_field_errors ? (
            <p className="field-error">{String(fieldErrors.non_field_errors)}</p>
          ) : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "..." : "Зарегистрироваться"}
          </button>
        </form>

        <p>
          Уже есть аккаунт?{" "}
          <Link to="/login" className="login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;