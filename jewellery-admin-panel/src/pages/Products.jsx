import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import Head from "../components/Head";
import Gate from "../components/Gate";
import Thumb from "../components/Thumb";
import ProductModal from "../components/ProductModal";
import useApi from "../hooks/useApi";
import { request } from "../api/client";
import { inr } from "../utils";

const load = () => request("/api/products").then((d) => d.products);
const EMPTY = { name: "", category: "", price: "", stock: "", image: "", description: "" };

export default function Products() {
  const { data: items, setData: setItems, loading, error, reload } = useApi(load);
  const [q, setQ] = useState("");
  const [modal, setModal] = useState(null);
  const [msg, setMsg] = useState("");

  if (loading || error) return <Gate loading={loading} error={error} onRetry={reload} />;

  const shown = items.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  // Call the API first, then update the list with what the server returns
  const save = async (p) => {
    const body = JSON.stringify({ name: p.name, category: p.category, price: p.price, stock: p.stock, image: p.image, description: p.description });
    const res = p._id
      ? await request(`/api/products/${p._id}`, { method: "PUT", body })
      : await request("/api/products", { method: "POST", body });
    setItems((list) => (p._id ? list.map((x) => (x._id === p._id ? res.product : x)) : [res.product, ...list]));
    setModal(null);
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete "${p.name}"?`)) return;
    try {
      await request(`/api/products/${p._id}`, { method: "DELETE" });
      setItems((list) => list.filter((x) => x._id !== p._id));
    } catch (e) { setMsg(e.message); }
  };

  return (
    <>
      <Head title="Products" sub={`${items.length} pieces in your catalogue`}>
        <button className="btn" onClick={() => setModal(EMPTY)}><Plus size={18} />Add product</button>
      </Head>
      {msg && <div className="err" style={{ marginBottom: 12 }}>{msg}</div>}
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
              <tr key={p._id}>
                <td><Thumb src={p.image} /> <b style={{ marginLeft: 12 }}>{p.name}</b></td>
                <td>{p.category}</td>
                <td>{inr(p.price)}</td>
                <td>{p.stock === 0 ? <span className="badge b-red">Out of stock</span> : p.stock < 10 ? <span className="badge b-amber">{p.stock} left</span> : p.stock}</td>
                <td style={{ textAlign: "right" }}>
                  <button className="icon-btn" aria-label="Edit" onClick={() => setModal(p)}><Pencil size={17} /></button>
                  <button className="icon-btn" aria-label="Delete" onClick={() => remove(p)}><Trash2 size={17} /></button>
                </td>
              </tr>
            ))}
            {!shown.length && <tr><td colSpan="5" className="hint">{items.length ? "No products match your search." : "No products yet. Add your first piece."}</td></tr>}
          </tbody>
        </table></div>
      </div>
      {modal && <ProductModal product={modal} onSave={save} onClose={() => setModal(null)} />}
    </>
  );
}
