# Kirana Admin Panel (React frontend)

Setup:
  npm install
  cp .env.example .env     # set your Express URL
  npm run dev

Demo login (when backend is off): admin / admin123
Before production: set DEMO = false in src/api/client.js

Backend contract:
  POST /api/admin/login  { username, password } -> { token }
  Other calls: use request("/api/...") from src/api/client.js (sends Bearer token)
