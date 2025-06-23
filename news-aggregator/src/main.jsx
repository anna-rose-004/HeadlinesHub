import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { PrefProvider } from "./contexts/PrefContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <PrefProvider>
        <BookmarkProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BookmarkProvider>
      </PrefProvider>
    </AuthProvider>
  </React.StrictMode>
);