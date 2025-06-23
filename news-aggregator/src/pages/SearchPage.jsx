import React, { useState } from "react";
import { fetchEverything } from "../api/newsApi";
import ArticleCard from "../components/ArticleCard";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await fetchEverything({ q, from, to });
    setArticles(data.articles || []);
    setLoading(false);
  };

  return (
    <div>
      <h2>Search News</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Keywords"
          required
        />
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {!loading && articles.map((a) => <ArticleCard key={a.url} article={a} />)}
    </div>
  );
}