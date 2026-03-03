import './Editprofile.css';
import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

const Editprofile = () => {
  const access = localStorage.getItem('access');

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [discription, setDiscription] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      if (!access) {
        console.log('Не авторизован');
        return;
      }

      const formData = new FormData();
      const trimmedName = name.trim();
      const trimmedDiscription = discription.trim();

      if (trimmedName) {
        formData.append('name', trimmedName);
      }

      if (trimmedDiscription) {
        formData.append('discription', trimmedDiscription);
      }

      if (age !== '') {
        const parsedAge = Number(age);
        if (Number.isFinite(parsedAge) && parsedAge >= 0) {
          formData.append('age', String(parsedAge));
        }
      }

      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      const hasChanges = Array.from(formData.keys()).length > 0;
      if (!hasChanges) {
        console.log('Нет изменений для сохранения');
        return;
      }

      const res = await fetch(`${API_BASE}/api/account/edit/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: formData,
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.log('Не авторизован');
        } else {
          console.log('Ошибка обновления');
        }
        return;
      }

      setAvatarFile(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="editprofile-card">
      <div className="settings-header">
        <h1>Настройки профиля</h1>
        <p>Заполните только те поля, которые хотите изменить.</p>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Отображаемое имя</label>
            <input
              type="text"
              id="name"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Возраст</label>
            <input
              type="number"
              id="age"
              min="0"
              placeholder="Возраст"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="discription">Описание</label>
            <textarea
              id="discription"
              rows="4"
              placeholder="Описание"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="avatar">Фото профиля</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <div className="form-actions">
          <p className="form-hint">Можно изменить только одно поле, остальные не трогаются.</p>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Editprofile;
