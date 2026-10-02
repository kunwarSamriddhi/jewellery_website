import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "lucide-react";
import { DEMO, loginRequest, setToken } from "../api/client";

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ username: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const data = await loginRequest(f);
      setToken(data.token);
      nav("/");
    } catch (ex) {
      if (DEMO && f.username === "admin" && f.password === "admin123") {
        setToken("demo");
        nav("/");
      } else {
        setErr(ex instanceof TypeError ? "Can't reach the server. Check that the backend is running." : ex.message);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <div className="login-art">
        <div className="brand"><i><Store size={18} /></i>Kirana Admin</div>
        <div>
          <h2>Run your store from one calm place.</h2>
          <p>Track orders, keep stock in check and know your customers.</p>
        </div>
        <span className="hint" style={{ color: "#7fa396" }}>© 2026 Kirana Store</span>
      </div>
      <div className="login-form">
        <form className="form" onSubmit={submit}>
          <div><h1>Welcome back</h1><p className="hint">Sign in to manage your store.</p></div>
          <label>Username
            <input className="input" value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} autoFocus required />
          </label>
          <label>Password
            <input className="input" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
          </label>
          {err && <div className="err">{err}</div>}
          <button className="btn dark" disabled={busy} style={{ justifyContent: "center" }}>{busy ? "Signing in..." : "Sign in"}</button>
          {DEMO && <p className="hint">Demo login: admin / admin123</p>}
        </form>
      </div>
    </div>
  );
}
