import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gem } from "lucide-react";
import { loginRequest, saveSession } from "../api/client";
import { STORE } from "../utils";

export default function Login() {
  const nav = useNavigate();
  const [f, setF] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setErr(""); setBusy(true);
    try {
      const data = await loginRequest(f);
      if (data.user?.role !== "admin") throw new Error("This account is not an admin account.");
      saveSession(data.token, data.user);
      nav("/");
    } catch (ex) {
      setErr(ex.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login">
      <div className="login-art">
        <div className="brand"><i><Gem size={18} /></i>{STORE}</div>
        <div>
          <h2>Every piece, every order, in one place.</h2>
          <p>Manage your jewellery catalogue, stock and customer orders.</p>
        </div>
        <span className="hint" style={{ color: "#7fa396" }}>© 2026 {STORE}</span>
      </div>
      <div className="login-form">
        <form className="form" onSubmit={submit}>
          <div><h1>Admin sign in</h1><p className="hint">Use your admin account to continue.</p></div>
          <label>Email
            <input className="input" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} autoFocus required />
          </label>
          <label>Password
            <input className="input" type="password" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} required />
          </label>
          {err && <div className="err">{err}</div>}
          <button className="btn dark" disabled={busy} style={{ justifyContent: "center" }}>{busy ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}
