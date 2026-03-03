import './Feed.css'
import { useEffect, useCallback, useMemo, useState } from "react"
import PostCard from "../../../components/feed/PostCard"

const API_BASE = 'http://127.0.0.1:8000'

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const [error, setError] = useState('')

    const handleLike = async (post) => {
        const access = localStorage.getItem("access")
        if (!access) {
            setError("Нужно войти в аккаунт, чтобы поставить лайк")
            return
        }

        try {
            const method = post.is_liked ? "DELETE" : "POST";

            const res = await fetch(`${API_BASE}/api/post/${post.id}/like/`, {
                method,
                headers: {
                    Authorization: `Bearer ${access}`,
                },
            })

            if (!res.ok) {
                throw new Error("Не удалось обновить лайк");
            }

            await loadPosts()
        } catch {
            setError("Ошибка лайка")
        }
    }


    const loadPosts = useCallback(async () => {
        const access = localStorage.getItem("access")

        try {
            setIsloading(true)
            setError("")

            const res = await fetch(`${API_BASE}/api/post/list/`, {
                method: "GET",
                headers: access ? { Authorization: `Bearer ${access}` } : {},
            })

            const data = await res.json()

            if (!res.ok) {
                setError("Не удалось загрузить посты")
            }

            setPosts(Array.isArray(data?.results) ? data.results : [])
        } catch {
            setError("Ошибка загрузки постов")
        } finally {
            setIsloading(false)
        }
    }, [])

    useEffect(() => {
        loadPosts()
        const refreshPosts = () => {
            loadPosts()
        }

        window.addEventListener('talky:post-created', refreshPosts)
        return () => {
            window.removeEventListener('talky:post-created', refreshPosts)
        }
    }, [loadPosts])

    const sortedPosts = useMemo(
        () => [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        [posts]
    )

    if (isLoading) return <p className="feed-message">Загрузка постов...</p>
    if (error) return <p className="feed-message feed-error">{error}</p>
    if (posts.length === 0) return <p className="feed-message">Постов пока нет</p>

    return (
        <div className="feed-page">
            {sortedPosts.map((post) => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
        </div>
    )
}

export default Feed
