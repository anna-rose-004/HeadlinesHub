import React, { useState } from "react";
import { usePrefs } from "../contexts/PrefContext";

const allCategories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
  "world"
];

export default function PreferencesPage() {
  const { preferences, updatePreferences } = usePrefs();
  const [categories, setCategories] = useState(preferences.categories);

  const handleCategoryChange = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePreferences({ categories });
    alert("Preferences updated!");
  };

  return (
    <div>
      <h2>User Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <b>Favorite Categories:</b>
          <div>
            {allCategories.map((cat) => (
              <label key={cat} style={{ marginRight: "12px" }}>
                <input
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
}