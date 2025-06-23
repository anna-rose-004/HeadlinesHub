import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
  "world"
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      <div>
        <Link to="/">News Aggregator</Link>
        {categories.map((cat) => (
          <Link key={cat} to={`/category/${cat}`}>
            {cat[0].toUpperCase() + cat.slice(1)}
          </Link>
        ))}
        <Link to="/trending">Trending</Link>
        <Link to="/sources">Sources</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/preferences">Preferences</Link>
        <Link to="/search">Search</Link>
      </div>
      <div className="right">
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={() => { logout(); navigate("/"); }}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}