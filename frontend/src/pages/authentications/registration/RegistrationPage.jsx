import './RegistrationPage.css'

const RegistrationPage = () => {
    return (
        <div className="registration-page-container">
            <div className="registration-page-card">
                <h1>Talky</h1>
                <h2>Создайте аккаунт</h2>
                <form>
                    <label htmlFor="username"><span className = "field-label">Придумайте никнейм</span>
                    <input type="text" placeholder="Никнейм" />
                    </label>
                    <label htmlFor="password"><span className = "field-label">Придумайте пароль</span>
                    <input type="password" placeholder="Пароль" />
                    </label>
                    <label htmlFor="password2"><span className = "field-label">Подтвердите пароль</span>
                    <input type="password" placeholder="Подтвердите пароль" />
                    </label>
                    <button type="submit">Зарегистрироваться</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage