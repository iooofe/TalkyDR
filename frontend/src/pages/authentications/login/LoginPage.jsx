import './LoginPage.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

const API_BASE = 'http://127.0.0.1:8000'

const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const formatError = (err) => {
        if (!err) return ''
        if (Array.isArray(err)) return err.filter(Boolean).join(' ')
        if (typeof err === 'string') return err
        if (typeof err === 'object') return JSON.stringify(err)
        return String(err)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError('')
        setFieldErrors({})

        if (!username.trim() || !password) {
            setFormError('Введите никнейм и пароль')
            return
        }

        setIsSubmitting(true)
        try {
            const res = await fetch(`${API_BASE}api/account/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })
            const data = await res.json().catch(() => ({}))
            if (!res.ok) {
                const serverMessage = formatError(data?.detail || data?.non_field_errors)
                if (serverMessage) setFormError(serverMessage)
                else if (data && typeof data === 'object') setFieldErrors(data)
                else setFormError('Ошибка входа')
                return
            }

            if (!data?.access || !data?.refresh) {
                setFormError('Неверный ответ сервера')
                return
            }

            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh', data.refresh)
            navigate(from, { replace: true })
        } catch (error) {
            setFormError('Сервер недоступен')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="login-page-container">
            <div className="login-page-card">
                <h1>Talky</h1>
                <h2>Войдите в аккаунт</h2>
                {formError ? <p className="form-error">{formError}</p> : null}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username"><span className="field-label">Никнейм</span>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            placeholder="Никнейм"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {fieldErrors.username ? <p className="field-error">{formatError(fieldErrors.username)}</p> : null}
                    <label htmlFor="password"><span className="field-label">Пароль</span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {fieldErrors.password ? <p className="field-error">{formatError(fieldErrors.password)}</p> : null}
                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Вход...' : 'Войти'}</button>
                </form>
                <p>Нет аккаунта? <Link to="/registration" className="registration-link">Зарегистрироваться</Link></p>
            </div>
        </div>
    )
}   

export default LoginPage