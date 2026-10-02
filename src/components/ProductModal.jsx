import { useState } from "react";

export default function ProductModal({ product, onSave, onClose }) {
  const [p, setP] = useState(product);
  const set = (key) => (e) => setP({ ...p, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSave({ ...p, price: +p.price, stock: +p.stock });
  };

  return (
    <div className="overlay" onClick={onClose}>
      <form className="modal form" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>{p.id ? "Edit product" : "Add product"}</h3>
        <label>Name<input className="input" value={p.name} onChange={set("name")} required autoFocus /></label>
        <label>Category<input className="input" value={p.category} onChange={set("category")} required /></label>
        <div className="row2">
          <label>Price (₹)<input className="input" type="number" min="0" value={p.price} onChange={set("price")} required /></label>
          <label>Stock<input className="input" type="number" min="0" value={p.stock} onChange={set("stock")} required /></label>
        </div>
        <div className="actions">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button className="btn">Save product</button>
        </div>
      </form>
    </div>
  );
}
