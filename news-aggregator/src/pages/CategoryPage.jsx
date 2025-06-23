import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTopHeadlines } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopHeadlines({ category }).then((data) => {
      setArticles(data.articles || []);
      setLoading(false);
    });
  }, [category]);

  return (
    <div>
      <h2>{category[0].toUpperCase() + category.slice(1)} News</h2>
      {loading && <p>Loading...</p>}
      {!loading && articles.length === 0 && <p>No news in this category.</p>}
      {articles.map((a) => (
        <ArticleCard key={a.url} article={a} />
      ))}
    </div>
  );
}