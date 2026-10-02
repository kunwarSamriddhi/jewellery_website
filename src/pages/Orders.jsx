import { useState } from "react";
import Head from "../components/Head";
import { ORDERS } from "../data/mock";
import { inr, statusTone } from "../utils";

export default function Orders() {
  const [orders, setOrders] = useState(ORDERS);
  const [filter, setFilter] = useState("All");

  const shown = orders.filter((o) => filter === "All" || o.status === filter);
  const setStatus = (id, status) => setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));

  return (
    <>
      <Head title="Orders" sub="Review and update customer orders." />
      <div className="card">
        <div className="tools">
          {["All", ...Object.keys(statusTone)].map((s) => (
            <button key={s} className={"btn " + (filter === s ? "dark" : "ghost")} onClick={() => setFilter(s)}>{s}</button>
          ))}
        </div>
        <div className="tbl-wrap"><table>
          <thead><tr><th>Order</th><th>Customer</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
          <tbody>
            {shown.map((o) => (
              <tr key={o.id}>
                <td><b>{o.id}</b></td><td>{o.customer}</td><td>{o.date}</td><td>{inr(o.total)}</td>
                <td>
                  <select className={`badge ${statusTone[o.status]}`} style={{ border: 0, cursor: "pointer" }}
                    value={o.status} onChange={(e) => setStatus(o.id, e.target.value)}>
                    {Object.keys(statusTone).map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
