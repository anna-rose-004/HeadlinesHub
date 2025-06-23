import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookmarks } from "../contexts/BookmarkContext";

export default function ArticlePage() {
  const { id } = useParams();
  const url = atob(decodeURIComponent(id));
  const { bookmarks } = useBookmarks();
  const article = bookmarks.find((a) => a.url === url);
  // In a real app, also fetch the article if not found in bookmarks

  const navigate = useNavigate();

  if (!article)
    return (
      <div>
        <p>Article not found. Bookmark the article to view details here.</p>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
    );

  return (
    <div>
      <h2>{article.title}</h2>
      <div className="meta">
        Source: {article.source?.name} | Author: {article.author || "Unknown"} |{" "}
        Published: {new Date(article.publishedAt).toLocaleString()}
      </div>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ maxWidth: "100%", margin: "1rem 0" }}
        />
      )}
      <p>{article.content || article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read Full Article
      </a>
    </div>
  );
}