import React, { useEffect, useState } from "react";
import { fetchSources } from "../api/newsApi";
import { usePrefs } from "../contexts/PrefContext";

export default function SourcesPage() {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const { preferences, updatePreferences } = usePrefs();

  useEffect(() => {
    setLoading(true);
    fetchSources().then((data) => {
      setSources(data.sources || []);
      setLoading(false);
    });
  }, []);

  const isFollowed = (id) => preferences.sources.includes(id);
  const toggleSource = (id) => {
    updatePreferences({
      sources: isFollowed(id)
        ? preferences.sources.filter((s) => s !== id)
        : [...preferences.sources, id]
    });
  };

  return (
    <div>
      <h2>News Sources</h2>
      {loading && <p>Loading...</p>}
      {!loading &&
        sources.map((src) => (
          <div
            key={src.id}
            style={{
              border: "1px solid #eee",
              margin: "8px 0",
              padding: "8px",
              borderRadius: "6px"
            }}
          >
            <b>{src.name}</b> <span style={{ color: "#888" }}>({src.category})</span>
            <div>{src.description}</div>
            <button onClick={() => toggleSource(src.id)}>
              {isFollowed(src.id) ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))}
    </div>
  );
}