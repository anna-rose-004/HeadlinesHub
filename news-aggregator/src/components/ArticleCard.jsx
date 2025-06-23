import React from "react";

export default function ArticleCard({ article }) {
  return (
    <article className="article-card">
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          src={article.urlToImage || "/fallback.jpg"}
          alt={article.title}
          className="article-img"
        />
      </a>
      <div className="article-card-content">
        <h2 className="article-card-title">{article.title}</h2>
        <p className="article-card-description">{article.description}</p>
        <div className="article-card-footer">
          <span>{article.source?.name}</span>
          <span>{article.publishedAt?.slice(0, 10)}</span>
        </div>
      </div>
    </article>
  );
}