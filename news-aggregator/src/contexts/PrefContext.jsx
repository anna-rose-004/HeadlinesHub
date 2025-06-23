import React, { createContext, useState, useContext } from "react";

const PrefContext = createContext();

export function PrefProvider({ children }) {
  const [preferences, setPreferences] = useState({
    categories: [],
    sources: [],
    language: "en",
    country: "us"
  });

  const updatePreferences = (prefs) =>
    setPreferences((prev) => ({ ...prev, ...prefs }));

  return (
    <PrefContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PrefContext.Provider>
  );
}
export const usePrefs = () => useContext(PrefContext);