// Point this at your Express server via .env -> VITE_API_URL=http://localhost:5000
export const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// true: lets admin / admin123 in when the backend is not running. Set false in production.
export const DEMO = true;

export const getToken = () => localStorage.getItem("admin_token");
export const setToken = (t) => localStorage.setItem("admin_token", t);
export const clearToken = () => localStorage.removeItem("admin_token");
export const isAuthed = () => !!getToken();

// Generic helper: adds the token and parses JSON. Use for all future API calls.
// Example: const products = await request("/api/products");
export async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong.");
  return data;
}

// Expects your backend to return { token }
export function loginRequest({ username, password }) {
  return request("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
