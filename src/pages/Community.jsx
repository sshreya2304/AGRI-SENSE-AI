import { useState } from "react";

function Community({ onBack }) {
  const [posts, setPosts] = useState([
    {
      author: "Rajesh Patel (Gujarat)",
      time: "2 hours ago",
      tag: "Pest Management 🐛",
      title: "How to handle whiteflies outbreak in cotton crops?",
      content: "Hi fellow farmers, my cotton plants are seeing a significant whitefly attack. The leaves are yellowing and curling. I tried spraying organic neem oil but it hasn't given much relief. What are your recommended sprays or methods?",
      likes: 8,
      comments: [
        { author: "Suresh Rao", text: "Try yellow sticky traps around the field borders to catch adult insects, and use a recommended systemic insecticide if the threshold is crossed." }
      ]
    },
    {
      author: "Harpreet Singh (Punjab)",
      time: "1 day ago",
      tag: "Wheat Farming 🌾",
      title: "Best timing and ratio for Urea application?",
      content: "Preparing for the second top dressing of urea on my wheat field. Soil moisture is optimal. Is it better to apply just before irrigation or right after? What dosage per acre are you guys using?",
      likes: 12,
      comments: [
        { author: "Amit Verma", text: "Apply urea just before light irrigation so it dissolves and sinks to root level, preventing evaporation loss." }
      ]
    }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newTag, setNewTag] = useState("General Advice 🌾");
  const [showForm, setShowForm] = useState(false);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost = {
      author: "You (Farmer)",
      time: "Just now",
      tag: newTag,
      title: newTitle,
      content: newContent,
      likes: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewTitle("");
    setNewContent("");
    setShowForm(false);
  };

  const handleLike = (index) => {
    const updated = [...posts];
    updated[index].likes += 1;
    setPosts(updated);
  };

  return (
    <div className="card-container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={onBack} className="btn-secondary" style={{ marginBottom: "20px" }}>
        ← Back to Dashboard
      </button>

      <div className="glass-card" style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <h2 style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
              👨‍🌾 Farmer Community Forum
            </h2>
            <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "5px", marginBottom: 0 }}>
              Connect with fellow farmers, share experiences, and seek advice.
            </p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary" style={{ marginTop: 0, padding: "10px 18px" }}>
            {showForm ? "Cancel Post" : "Create Post"}
          </button>
        </div>

        {/* Create Post Form */}
        {showForm && (
          <form
            onSubmit={handleCreatePost}
            style={{
              background: "rgba(15, 23, 42, 0.4)",
              border: "1px solid rgba(34, 197, 94, 0.2)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              animation: "slideDown 0.3s ease-out"
            }}
          >
            <h4 style={{ margin: 0, color: "white" }}>Ask a Question</h4>
            <input
              type="text"
              placeholder="Question Title (e.g. Rice leaf yellowing)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="custom-input"
              required
            />
            <select
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="custom-input"
              style={{ padding: "12px" }}
            >
              <option>General Advice 🌾</option>
              <option>Pest Management 🐛</option>
              <option>Irrigation & Soil 💧</option>
              <option>Subsidies & Markets 🏛️</option>
            </select>
            <textarea
              placeholder="Describe your situation or question in detail..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="custom-input"
              style={{ minHeight: "100px", padding: "12px" }}
              required
            />
            <button type="submit" className="btn-primary" style={{ marginTop: "5px", alignSelf: "flex-end" }}>
              Publish Post
            </button>
          </form>
        )}

        {/* Posts Thread */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {posts.map((post, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(15, 23, 42, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <strong style={{ color: "#f8fafc", fontSize: "14px" }}>{post.author}</strong>
                  <span style={{ color: "#64748b", fontSize: "12px", marginLeft: "10px" }}>{post.time}</span>
                </div>
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "#94a3b8",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "11px"
                  }}
                >
                  {post.tag}
                </span>
              </div>

              <h3 style={{ margin: 0, color: "white", fontSize: "16px" }}>{post.title}</h3>
              <p style={{ margin: 0, color: "#cbd5e1", fontSize: "14px", lineHeight: "1.5" }}>
                {post.content}
              </p>

              {/* Likes & Comments Action */}
              <div style={{ display: "flex", gap: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
                <button
                  onClick={() => handleLike(idx)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#22c55e",
                    cursor: "pointer",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  👍 Like ({post.likes})
                </button>
                <span style={{ color: "#94a3b8", fontSize: "13px" }}>
                  💬 Comments ({post.comments.length})
                </span>
              </div>

              {/* Comments Section */}
              {post.comments.length > 0 && (
                <div
                  style={{
                    background: "rgba(15, 23, 42, 0.4)",
                    borderRadius: "10px",
                    padding: "12px 16px",
                    marginTop: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                  }}
                >
                  {post.comments.map((comment, cIdx) => (
                    <div key={cIdx} style={{ fontSize: "13px" }}>
                      <strong style={{ color: "#4ade80" }}>{comment.author}:</strong>
                      <span style={{ color: "#cbd5e1", marginLeft: "6px" }}>{comment.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;
