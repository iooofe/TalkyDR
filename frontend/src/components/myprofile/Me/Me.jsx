import "./Me.css";
import State from "../State/State";
import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function Me() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      setErrorText("Нет токена. Войдите заново.");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadMe() {
      try {
        setLoading(true);
        setErrorText("");

        const res = await fetch(`${API_BASE}/api/account/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setErrorText("Сессия истекла. Войдите заново.");
          } else {
            setErrorText("Не удалось загрузить профиль.");
          }
          return;
        }

        const data = await res.json();
        if (!cancelled) setProfile(data);
      } catch {
        if (!cancelled) setErrorText("Сервер недоступен.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  const displayName = profile?.name || profile?.username || "—";
  const username = profile?.username || "";
  const avatarSrc = profile?.avatar || "";
  const age = profile?.age || "";
  const discription = profile?.discription || "";
  const initial = String(displayName).trim().charAt(0).toUpperCase() || "?";

  return (
    <div className="me-card">
      <div className="me-card-top">
        {avatarSrc ? (
          <img src={avatarSrc} alt={displayName} className="avatar" />
        ) : (
          <div className="avatar avatar-placeholder">{initial}</div>
        )}

        <div className="me-main-info">
          <h1>{displayName}</h1>
          {username ? <p className="username">@{username}</p> : null}
          <p className="me-age">{age ? `${age} лет` : "Возраст не указан"}</p>
        </div>
      </div>

      <div className="me-about">
        <p className="me-about-title">О себе</p>
        <p className="me-about-text">{discription || "Описание пока не добавлено"}</p>
      </div>

      {loading ? <p className="me-info-message">Загрузка профиля...</p> : null}
      {errorText ? <p className="me-error-message">{errorText}</p> : null}

      <div className="state">
        <State />
        <State />
        <State />
      </div>
    </div>
  );
}

export default Me;
