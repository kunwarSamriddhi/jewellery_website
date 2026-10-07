import { useState } from "react";
import Thumb from "./Thumb";

export default function ProductModal({ product, onSave, onClose }) {
  const [p, setP] = useState(product);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k) => (e) => setP({ ...p, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try { await onSave({ ...p, price: +p.price, stock: +p.stock }); }
    catch (ex) { setErr(ex.message); setBusy(false); }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal form" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{p._id ? "Edit product" : "Add product"}</h3>
        <label>Name<input className="input" value={p.name} onChange={set("name")} required autoFocus /></label>
        <div className="row2">
          <label>Category<input className="input" value={p.category} onChange={set("category")} placeholder="Rings, Necklaces..." /></label>
          <label>Price (₹)<input className="input" type="number" min="0" value={p.price} onChange={set("price")} required /></label>
        </div>
        <div className="row2">
          <label>Stock<input className="input" type="number" min="0" value={p.stock} onChange={set("stock")} required /></label>
          <label>Image URL
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input className="input" style={{ flex: 1 }} value={p.image} onChange={set("image")} placeholder="https://..." />
              <Thumb src={p.image} size={42} />
            </div>
          </label>
        </div>
        <label>Description<input className="input" value={p.description} onChange={set("description")} /></label>
        {err && <div className="err">{err}</div>}
        <div className="actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn" disabled={busy}>{busy ? "Saving..." : "Save product"}</button>
        </div>
      </form>
    </div>
  );
}
