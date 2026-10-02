import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Head from "../components/Head";
import ProductModal from "../components/ProductModal";
import { PRODUCTS } from "../data/mock";
import { inr } from "../utils";

const EMPTY = { name: "", category: "", price: "", stock: "" };

export default function Products() {
  const [items, setItems] = useState(PRODUCTS);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null); // null | product object

  const shown = items.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  const save = (p) => {
    setItems((list) =>
      p.id ? list.map((x) => (x.id === p.id ? p : x)) : [...list, { ...p, id: Date.now(), emoji: "📦" }]
    );
    setModal(null);
  };

  return (
    <>
      <Head title="Products" sub={`${items.length} products in your catalogue`}>
        <button className="btn" onClick={() => setModal(EMPTY)}><Plus size={18} />Add product</button>
      </Head>
      <div className="card">
        <div className="tools">
          <div style={{ position: "relative", flex: 1, display: "flex" }}>
            <Search size={17} style={{ position: "absolute", left: 12, top: 12, color: "#6b7a76" }} />
            <input className="input" style={{ paddingLeft: 36, width: "100%" }} placeholder="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="tbl-wrap"><table>
          <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th /></tr></thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id}>
                <td><span className="thumb">{p.emoji}</span><b>{p.name}</b></td>
                <td>{p.category}</td>
                <td>{inr(p.price)}</td>
                <td>
                  {p.stock === 0 ? <span className="badge b-red">Out of stock</span>
                    : p.stock < 10 ? <span className="badge b-amber">{p.stock} left</span> : p.stock}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="icon-btn" aria-label="Edit" onClick={() => setModal(p)}><Pencil size={17} /></button>
                  <button className="icon-btn" aria-label="Delete" onClick={() => setItems(items.filter((x) => x.id !== p.id))}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
            {!shown.length && (
              <tr><td colSpan="5" className="hint">No products match your search. Try a different name or add a new product.</td></tr>
            )}
          </tbody>
        </table></div>
      </div>
      {modal && <ProductModal product={modal} onSave={save} onClose={() => setModal(null)} />}
    </>
  );
}
