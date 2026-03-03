import { Heart, MessageCircle } from "lucide-react"

function PostCard({ post, onLike }) {
  const authorName = post.author_name || post.author_username || "Неизвестный автор"
  const authorUsername = post.author_name ? `@${post.author_username || ""}` : ""
  const initial = String(authorName).trim().charAt(0).toUpperCase() || "?"

  return (
    <article className="post-card">
      <div className="post-author">
        {post.author_avatar ? (
          <img src={post.author_avatar} alt={authorName} className="post-avatar" />
        ) : (
          <div className="post-avatar avatar-placeholder">{initial}</div>
        )}
        <div className="post-author-text">
          <p className="post-author-name">{authorName}</p>
          {authorUsername ? <p className="post-author-username">{authorUsername}</p> : null}
        </div>
      </div>

      <hr className="post-divider" />
      <h2 className="post-title">{post.title}</h2>

      {post.image ? (
        <img src={post.image} alt={post.title} className="post-image" />
      ) : null}

      <p className="post-text">{post.text}</p>
      <div className="post-actions">
        <button
          type="button"
          className={`like-btn ${post.is_liked ? "liked" : ""}`}
          onClick={() => onLike(post)}
        >
          <Heart size={16} /> {post.likes_count ?? 0}
        </button>
        <button type = "button" className = "like-btn"><MessageCircle size={16} />{post.comment_count ?? 0}</button>
      </div>

      <p className="post-date">
        {new Date(post.created_at).toLocaleString("ru-RU")}
      </p>
    </article>
  )
}

export default PostCard
