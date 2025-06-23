import React, { useEffect, useState } from "react";
import { fetchEverything } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function TrendingPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // "Trending" is mocked as sorting by popularity and recency
  useEffect(() => {
    setLoading(true);
    fetchEverything({ q: "news", sortBy: "popularity" }).then((data) => {
      setArticles(data.articles || []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Trending News</h2>
      {loading && <p>Loading...</p>}
      {!loading && articles.length === 0 && <p>No trending news found.</p>}
      {articles.map((a) => (
        <ArticleCard key={a.url} article={a} />
      ))}
    </div>
  );
}