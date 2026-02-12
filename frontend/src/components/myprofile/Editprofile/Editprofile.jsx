import './Editprofile.css'
import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000'

const Editprofile = () => {
    const access = localStorage.getItem('access');

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [discription, setDiscription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);

            const res = await fetch(`${API_BASE}/api/account/edit/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access}`,
                },
                body: JSON.stringify({
                    name,
                    age,
                    discription,
                }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    console.log('Не авторизован');
                } else {
                    console.log('Ошибка обновления');
                }
                return;
            }

        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="editprofile-card">
            <h1>Редактировать профиль</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Изменить отображаемое имя</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="discription">Изменить описание</label>
                    <input type="text" id="discription" value={discription} onChange={(e) => setDiscription(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Изменить возраст</label>
                    <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
        </div>
    );
};

export default Editprofile;
