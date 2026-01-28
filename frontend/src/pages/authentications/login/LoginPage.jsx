import './LoginPage.css'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        <div className="login-page-container">
            <div className="login-page-card">
                <h1>Talky</h1>
                <h2>Войдите в аккаунт</h2>
                <form>
                    <label htmlFor="username"><span className="field-label">Никнейм</span>
                        <input type="text" placeholder="Никнейм" />
                    </label>
                    <label htmlFor="password"><span className="field-label">Пароль</span>
                        <input type="password" placeholder="Пароль" />
                    </label>
                    <button type="submit">Войти</button>
                </form>
                <p>Нет аккаунта? <Link to="/registration" className="registration-link">Зарегистрироваться</Link></p>
            </div>
        </div>
    )
}

export default LoginPage