import "./RegistrationPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [focused, setFocused] = useState({
    username: false,
    password: false,
    password2: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");

  const isRussianText = (text) => /[А-Яа-яЁё]/.test(String(text));

  const translateErrorText = (text) => {
    const raw = String(text ?? "").trim();
    if (!raw) return "";
    if (isRussianText(raw)) return raw;

    const t = raw.toLowerCase();

    if (
      t.includes("no active account") ||
      t.includes("unable to log in") ||
      t.includes("invalid username or password") ||
      t.includes("given credentials")
    ) {
      return "Неверное имя пользователя или пароль";
    }

    if (t === "this field may not be blank." || t.includes("may not be blank")) {
      return "Это поле не может быть пустым.";
    }
    if (t === "this field is required." || t.includes("is required")) {
      return "Это поле обязательно.";
    }

    const minMatch = raw.match(/at least (\d+) characters?/i);
    if (minMatch) return `Минимум ${minMatch[1]} символов.`;

    const maxMatch = raw.match(/no more than (\d+) characters?/i);
    if (maxMatch) return `Максимум ${maxMatch[1]} символов.`;

    if (t.includes("a user with that username already exists")) {
      return "Пользователь с таким никнеймом уже существует.";
    }
    if (t.includes("the two password fields didn't match") || t.includes("passwords do not match")) {
      return "Пароли не совпадают.";
    }
    if (t.includes("this password is too common")) {
      return "Этот пароль слишком простой.";
    }
    if (t.includes("this password is entirely numeric")) {
      return "Пароль не должен состоять только из цифр.";
    }
    if (t.includes("this password is too short")) {
      const m = raw.match(/at least (\d+) characters?/i);
      return m
        ? `Пароль слишком короткий. Минимум ${m[1]} символов.`
        : "Пароль слишком короткий.";
    }

    return "Некорректные данные.";
  };

  const formatError = (err) => {
    const flatten = (v) => {
      if (!v) return [];
      if (Array.isArray(v)) return v.flatMap(flatten);
      if (typeof v === "string") return [v];
      if (typeof v === "number" || typeof v === "boolean") return [String(v)];
      if (typeof v === "object") return [JSON.stringify(v)];
      return [String(v)];
    };

    return flatten(err).map(translateErrorText).filter(Boolean).join(" ");
  };

  const clearFieldError = (fieldName) => {
    setFieldErrors((prev) => {
      if (!prev || !prev[fieldName]) return prev;
      const next = { ...prev };
      delete next[fieldName];
      return next;
    });
  };

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
          const topLevel = data?.detail || data?.non_field_errors;
          if (topLevel) setFormError(formatError(topLevel));

          const rest = { ...data };
          delete rest.detail;
          delete rest.non_field_errors;
          setFieldErrors(rest);
        } else {
          setFormError("Ошибка регистрации");
        }
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/myprofile", { replace: true });
    } catch {
      setFormError("Сервер недоступен");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-page-container">
      <div className="registration-page-card">
        <div className="header">
          <h1>Talky</h1>
          <h3>Создайте аккаунт</h3>
        </div>
        <div className="main">
          {formError ? <p className="form-error">{formError}</p> : null}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span className="field-label">Придумайте никнейм</span>
              <input
                id="username"
                type="text"
                placeholder={
                  fieldErrors.username && !focused.username
                    ? formatError(fieldErrors.username)
                    : "Никнейм"
                }
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  clearFieldError("username");
                  if (formError) setFormError("");
                }}
                autoComplete="username"
                onFocus={() => setFocused((p) => ({ ...p, username: true }))}
                onBlur={() => setFocused((p) => ({ ...p, username: false }))}
                className={fieldErrors.username && !focused.username ? "input-error" : ""}
                aria-invalid={Boolean(fieldErrors.username)}
              />
            </label>

            <label htmlFor="password">
              <span className="field-label">Придумайте пароль</span>
              <input
                id="password"
                type="password"
                placeholder={
                  fieldErrors.password && !focused.password
                    ? formatError(fieldErrors.password)
                    : "Пароль"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                  if (formError) setFormError("");
                }}
                autoComplete="new-password"
                onFocus={() => setFocused((p) => ({ ...p, password: true }))}
                onBlur={() => setFocused((p) => ({ ...p, password: false }))}
                className={fieldErrors.password && !focused.password ? "input-error" : ""}
                aria-invalid={Boolean(fieldErrors.password)}
              />
            </label>

            <label htmlFor="password2">
              <span className="field-label">Подтвердите пароль</span>
              <input
                id="password2"
                type="password"
                placeholder={
                  fieldErrors.password2 && !focused.password2
                    ? formatError(fieldErrors.password2)
                    : "Подтвердите пароль"
                }
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                  clearFieldError("password2");
                  if (formError) setFormError("");
                }}
                autoComplete="new-password"
                onFocus={() => setFocused((p) => ({ ...p, password2: true }))}
                onBlur={() => setFocused((p) => ({ ...p, password2: false }))}
                className={fieldErrors.password2 && !focused.password2 ? "input-error" : ""}
                aria-invalid={Boolean(fieldErrors.password2)}
              />
            </label>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "..." : "Зарегистрироваться"}
            </button>
          </form>

          <p className="auth-switch">
            Уже есть аккаунт?{" "}
            <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
