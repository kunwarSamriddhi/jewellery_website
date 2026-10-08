import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Head from "../components/Head";
import Gate from "../components/Gate";
import useApi from "../hooks/useApi";
import { request } from "../api/client";
import { inr, orderNo, fmtDate, fmtAddress, statusTone } from "../utils";

const load = () => request("/api/orders/admin/all").then((d) => d.orders);
const STATUSES = Object.keys(statusTone);

export default function Orders() {
  const { data: orders, setData: setOrders, loading, error, reload } = useApi(load);
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(null);
  const [msg, setMsg] = useState("");

  if (loading || error) return <Gate loading={loading} error={error} onRetry={reload} />;

  const shown = orders.filter((o) => filter === "All" || o.status === filter);

  // Needs PATCH /api/orders/:id/status on the backend (see backend-additions/)
  const setStatus = async (o, status) => {
    if (status === "Cancelled" && !window.confirm("Cancel this order? This cannot be undone.")) return;
    setMsg("");
    try {
      await request(`/api/orders/${o._id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      setOrders((list) => list.map((x) => (x._id === o._id ? { ...x, status } : x)));
    } catch (e) { setMsg(e.message); }
  };

  return (
    <>
      <Head title="Orders" sub="Review and update customer orders." />
      {msg && <div className="err" style={{ marginBottom: 12 }}>{msg}</div>}
      <div className="card">
        <div className="tools">
          {["All", ...STATUSES].map((s) => (
            <button key={s} className={"btn " + (filter === s ? "dark" : "ghost")} onClick={() => setFilter(s)}>
              {s} ({s === "All" ? orders.length : orders.filter((o) => o.status === s).length})
            </button>
          ))}
        </div>
        <div className="tbl-wrap"><table>
          <thead><tr><th /><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {shown.map((o) => (
              <Fragment key={o._id}>
                <tr>
                  <td><button className="icon-btn" aria-label="Details" onClick={() => setOpen(open === o._id ? null : o._id)}>
                    {open === o._id ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button></td>
                  <td><b>{orderNo(o._id)}</b></td>
                  <td>{o.user?.name || "Deleted user"}</td>
                  <td>{fmtDate(o.createdAt)}</td>
                  <td>{inr(o.totalAmount)}</td>
                  <td>
                    <select className={`badge ${statusTone[o.status]}`} style={{ border: 0, cursor: "pointer" }}
                      value={o.status} disabled={o.status === "Cancelled"} onChange={(e) => setStatus(o, e.target.value)}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
                {open === o._id && (
                  <tr className="detail"><td /><td colSpan="5">
                    {o.user?.email && <p className="hint">{o.user.email}</p>}
                    {o.products.map((it, i) => (
                      <p key={i}>{it.product?.name || "Deleted product"} × {it.quantity} — {inr(it.price * it.quantity)}</p>
                    ))}
                    {o.shippingAddress && <p style={{ marginTop: 8 }}><b>Ship to:</b> {fmtAddress(o.shippingAddress)}</p>}
                  </td></tr>
                )}
              </Fragment>
            ))}
            {!shown.length && <tr><td colSpan="6" className="hint">No orders here.</td></tr>}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
