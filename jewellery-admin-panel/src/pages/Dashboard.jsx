import Head from "../components/Head";
import Gate from "../components/Gate";
import Thumb from "../components/Thumb";
import useApi from "../hooks/useApi";
import { request } from "../api/client";
import { inr, orderNo, statusTone } from "../utils";

// Uses the existing routes; numbers are worked out here from the loaded lists
const load = async () => {
  const [p, o] = await Promise.all([request("/api/products"), request("/api/orders/admin/all")]);
  return { products: p.products, orders: o.orders };
};

export default function Dashboard() {
  const { data, loading, error, reload } = useApi(load);
  if (loading || error) return <Gate loading={loading} error={error} onRetry={reload} />;

  const { products, orders } = data;
  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((s, o) => s + o.totalAmount, 0);
  const lowStock = products.filter((p) => p.stock < 10).sort((a, b) => a.stock - b.stock);
  const stats = [
    ["Revenue", inr(revenue), "Cancelled orders excluded"],
    ["Orders", orders.length, `${orders.filter((o) => o.status === "Pending" || o.status === "Confirmed").length} to process`],
    ["Products", products.length, "In your catalogue"],
    ["Low stock", lowStock.length, "Under 10 pieces"],
  ];

  return (
    <>
      <Head title="Dashboard" sub="A quick look at your store." />
      <div className="stats">
        {stats.map(([l, v, s]) => (
          <div className="card stat" key={l}><span>{l}</span><b>{v}</b><small className="hint">{s}</small></div>
        ))}
      </div>
      <div className="two">
        <div className="card">
          <h3>Recent orders</h3>
          <div className="tbl-wrap"><table><tbody>
            {orders.slice(0, 5).map((o) => (
              <tr key={o._id}>
                <td><b>{orderNo(o._id)}</b><br /><span className="hint">{o.user?.name || "Deleted user"}</span></td>
                <td>{inr(o.totalAmount)}</td>
                <td><span className={`badge ${statusTone[o.status]}`}>{o.status}</span></td>
              </tr>
            ))}
            {!orders.length && <tr><td className="hint">No orders yet.</td></tr>}
          </tbody></table></div>
        </div>
        <div className="card">
          <h3>Running low</h3>
          <div className="tbl-wrap"><table><tbody>
            {lowStock.slice(0, 5).map((p) => (
              <tr key={p._id}>
                <td><Thumb src={p.image} size={34} /> <b style={{ marginLeft: 10 }}>{p.name}</b></td>
                <td>{p.stock === 0 ? <span className="badge b-red">Out of stock</span> : <span className="badge b-amber">{p.stock} left</span>}</td>
              </tr>
            ))}
            {!lowStock.length && <tr><td className="hint">All products are well stocked.</td></tr>}
          </tbody></table></div>
        </div>
      </div>
    </>
  );
}
