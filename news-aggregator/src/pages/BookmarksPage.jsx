import React from "react";
import { useBookmarks } from "../contexts/BookmarkContext";
import ArticleCard from "../components/ArticleCard";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  return (
    <div>
      <h2>Bookmarked Articles</h2>
      {bookmarks.length === 0 && <p>No bookmarks yet.</p>}
      {bookmarks.map((a) => (
        <ArticleCard key={a.url} article={a} />
      ))}
    </div>
  );
}