import React, { useEffect, useState } from "react";
import "./App.css";
import ArticleCard from "./components/ArticleCard";
import { fetchTopHeadlines } from "./api/newsApi";

// List of country codes and names
const countryList = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "in", name: "India" },
  { code: "au", name: "Australia" },
  { code: "ca", name: "Canada" },
  { code: "de", name: "Germany" },
  { code: "fr", name: "France" },
  // Add more as needed
];

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("us");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchTopHeadlines({ country, category })
      .then((data) => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, country]);

  return (
    <div>
      <header className="navbar">
        <span className="logo">Headlines Hub</span>
        <nav>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`nav-btn${category === cat ? " active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
        <select
          className="country-select"
          value={country}
          onChange={e => setCountry(e.target.value)}
        >
          {countryList.map(c => (
            <option value={c.code} key={c.code}>{c.name}</option>
          ))}
        </select>
      </header>
      <main>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <section className="articles">
            {articles.map((article, idx) => (
              <ArticleCard article={article} key={idx} />
            ))}
          </section>
        )}
      </main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} News Aggregator. All rights reserved.
      </footer>
    </div>
  );
}