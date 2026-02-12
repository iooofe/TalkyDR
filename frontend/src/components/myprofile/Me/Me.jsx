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
      } catch (e) {
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

  return (
    <div className="me-card">
      <div className="me-card-header">
        <img src={avatarSrc} alt="" className="avatar" />
        <h1>{displayName}</h1>
        <p className="username">{username ? `@${username}` : ""}</p>
        <div className = "all-discription">
        <p>{age} лет</p>
        <p>{discription ? `${discription}` : '-'}</p>
        </div>
        {loading ? <p>Загрузка профиля...</p> : null}
        {errorText ? <p>{errorText}</p> : null}
      </div>

      <div className="state">
        <State />
        <State />
        <State />
      </div>
    </div>
  );
}

export default Me;