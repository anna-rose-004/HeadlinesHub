import React, { createContext, useState, useContext } from "react";

const BookmarkContext = createContext();

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (article) => {
    setBookmarks((prev) =>
      prev.find((a) => a.url === article.url) ? prev : [...prev, article]
    );
  };
  const removeBookmark = (url) => {
    setBookmarks((prev) => prev.filter((a) => a.url !== url));
  };
  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}
export const useBookmarks = () => useContext(BookmarkContext);