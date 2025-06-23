import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email);
    navigate("/");
  };

  return (
    <div>
      <h2>Login or Continue as Guest</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button
        style={{ marginTop: "14px" }}
        onClick={() => {
          login("guest@news.com");
          navigate("/");
        }}
      >
        Continue as Guest
      </button>
    </div>
  );
}