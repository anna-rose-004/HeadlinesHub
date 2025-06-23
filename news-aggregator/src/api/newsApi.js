const BASE = "http://localhost:4000/api"; // Proxy backend URL

export async function fetchTopHeadlines({ country, category }) {
  const params = new URLSearchParams();
  if (country) params.append('country', country);
  if (category) params.append('category', category);

  // FIX: Use BASE!
  const res = await fetch(`${BASE}/top-headlines?${params.toString()}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}