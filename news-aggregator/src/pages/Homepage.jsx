import React, { useEffect, useState } from "react";
import { usePrefs } from "../contexts/PrefContext";
import { fetchTopHeadlines } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function HomePage() {
  const { preferences } = usePrefs();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopHeadlines({
      country: preferences.country,
      category: preferences.categories[0] || undefined,
      language: preferences.language
    }).then((data) => {
      setArticles(data.articles || []);
      setLoading(false);
    });
  }, [preferences]);

  return (
    <div>
      <h2>Top Headlines</h2>
      {loading && <p>Loading...</p>}
      {!loading && articles.length === 0 && <p>No news available.</p>}
      {articles.map((a) => (
        <ArticleCard key={a.url} article={a} />
      ))}
    </div>
  );
}