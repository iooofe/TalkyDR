import './Header.css'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://127.0.0.1:8000'

const Header = () => {
  const navigate = useNavigate()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [imageFile, setImageFile] = useState(null)

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login', { replace: true })
  }

  const openCreateModal = () => {
    setIsCreateOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateOpen(false)
    setTitle('')
    setText('')
    setImageFile(null)
  }

  const [isCreating, setIscreating] = useState(false)
  const [Error, setError] = useState("")

  const handleCreatePost = async (e) => {
    e.preventDefault()
    const access = localStorage.getItem("access")
    if (!access) {
      setError("Ввойдите в аккаунт")
      return
    }
    if (!title.trim() || !text.trim()) {
      setError("Заполните название и описание")
      return
    }

    try {
      setIscreating(true)
      setError("")

      const MeRes = await fetch(`${API_BASE}/api/account/me/`, {
        headers: { Authorization: `Bearer ${access}` }
      })

      if (!MeRes.ok) throw new Error("Не удалость получить пользователя")
      const me = await MeRes.json()

      const formData = new FormData()
      formData.append('author', String(me.id))
      formData.append('title', String(title.trim()))
      formData.append('text', String(text.trim()))
      formData.append('is_publish', 'true')
      if (imageFile) formData.append('image', imageFile)

      const res = await fetch(`${API_BASE}/api/post/create/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${access}` },
        body: formData 
      })
      if (!res.ok) {
        setError("Не удалось создать пост")
        return
      }
      closeCreateModal()
      window.dispatchEvent(new Event('talky:post-created'))
    } finally {
      setIscreating(false)
    }
  }

  useEffect(() => {
    if (!isCreateOpen) return undefined

    const onEscape = (event) => {
      if (event.key === 'Escape') {
        closeCreateModal()
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [isCreateOpen])

  return (
    <>
      <div className="header-inner">
        <div className="header-actions">
          <button onClick={openCreateModal} className="create-post-btn" type="button">
            Создать пост
          </button>
          <button onClick={logout} className="logout" type="button" aria-label="Выйти">
            <LogOut />
          </button>
        </div>
      </div>

      {isCreateOpen ? (
        <div className="create-post-modal-overlay" onClick={closeCreateModal} role="presentation">
          <div className="create-post-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Новый пост</h2>
            <p className="modal-subtitle">Заполни только нужные поля и нажми «Создать».</p>

            <form className="create-post-form" onSubmit={handleCreatePost}>
              <label htmlFor="post-title">Название</label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Название поста"
              />

              <label htmlFor="post-text">Описание</label>
              <textarea
                id="post-text"
                rows="4"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Текст поста"
              />

              <label htmlFor="post-image">Фото</label>
              <input
                id="post-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              />
              <p>{Error}</p>
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={closeCreateModal}>
                  Отмена
                </button>
                <button type="submit" className="modal-submit-btn" disabled = {isCreating}>
                  {!isCreating ? "Создать" : "Создание..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Header
