// Set your Express URL in .env -> VITE_API_URL=http://localhost:5000
export const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TOKEN = "admin_token";
const USER = "admin_user";

export const getToken = () => localStorage.getItem(TOKEN);
export const isAuthed = () => !!getToken();
export const getUser = () => {
  try { return JSON.parse(localStorage.getItem(USER)); } catch { return null; }
};
export const saveSession = (token, user) => {
  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER, JSON.stringify(user));
};
export const clearSession = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(USER);
};

// Use for every API call. Adds the token, parses JSON, logs out automatically on 401.
export async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new Error("Can't reach the server. Check that the backend is running.");
  }
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && getToken()) {
    clearSession();
    window.location.assign("/login");
    throw new Error("Session expired. Please log in again.");
  }
  if (!res.ok) throw new Error(data.message || (res.status === 404 ? "This route does not exist on the backend yet." : "Something went wrong."));
  return data;
}

// Backend: POST /api/auth/login -> { token, user: { name, email, role } }
export const loginRequest = ({ email, password }) =>
  request("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
