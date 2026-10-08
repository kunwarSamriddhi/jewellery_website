import { Fragment, useState } from "react";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import Head from "../components/Head";
import Gate from "../components/Gate";
import useApi from "../hooks/useApi";
import { request } from "../api/client";
import { inr, fmtDate } from "../utils";

// Needs GET /api/admin/customers on the backend (see BACKEND_ADDITIONS.md). Returns all users with a role.
const load = () => request("/api/admin/customers").then((d) => d.customers);

export default function Customers() {
  const { data, loading, error, reload } = useApi(load);
  const [view, setView] = useState("customers"); // "customers" | "all"
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  if (loading || error) return <Gate loading={loading} error={error} onRetry={reload} />;

const customers = data.filter((u) => u.role === "user" && u.spent > 0);
  const list = view === "all" ? data : customers;
  const s = q.toLowerCase();
  const shown = list.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s));
  const cols = view === "all" ? 6 : 5;

  return (
    <>
      <Head title="Customers" sub={view === "all" ? "Everyone with an account, including admins." : "People who have bought from your store."} />
      <div className="card">
        <div className="tools">
          <button className={"btn " + (view === "customers" ? "dark" : "ghost")} onClick={() => setView("customers")}>Customers ({customers.length})</button>
          <button className={"btn " + (view === "all" ? "dark" : "ghost")} onClick={() => setView("all")}>All users ({data.length})</button>
          <div style={{ position: "relative", flex: 1, display: "flex", minWidth: 200 }}>
            <Search size={17} style={{ position: "absolute", left: 12, top: 12, color: "#6b7a76" }} />
            <input className="input" style={{ paddingLeft: 36, width: "100%" }} placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        </div>
        <div className="tbl-wrap"><table>
          <thead><tr><th /><th>Name</th><th>Email</th>{view === "all" && <th>Role</th>}<th>Orders</th><th>Total spent</th></tr></thead>
          <tbody>
            {shown.map((u) => (
              <Fragment key={u._id}>
                <tr>
                  <td><button className="icon-btn" aria-label="Details" onClick={() => setOpen(open === u._id ? null : u._id)}>
                    {open === u._id ? <ChevronDown size={17} /> : <ChevronRight size={17} />}</button></td>
                  <td><span className="avatar" style={{ display: "inline-grid", width: 34, height: 34, marginRight: 12, verticalAlign: "middle" }}>{u.name[0]}</span><b>{u.name}</b></td>
                  <td>{u.email}</td>
                  {view === "all" && <td><span className={`badge ${u.role === "admin" ? "b-amber" : "b-blue"}`}>{u.role === "admin" ? "Admin" : "Customer"}</span></td>}
                  <td>{u.orders || <span className="hint">None yet</span>}</td>
                  <td>{inr(u.spent)}</td>
                </tr>
                {open === u._id && (
                  <tr className="detail"><td /><td colSpan={cols}>
                    <p><b>Joined:</b> {fmtDate(u.joinedAt)}</p>
                    <p><b>Last order:</b> {u.lastOrderAt ? fmtDate(u.lastOrderAt) : "No orders yet"}</p>
                    <p><b>Role:</b> {u.role === "admin" ? "Admin" : "Customer"}</p>
                    <p className="hint">ID: {u._id}</p>
                  </td></tr>
                )}
              </Fragment>
            ))}
            {!shown.length && <tr><td colSpan={cols + 1} className="hint">{list.length ? "No one matches your search." : "No customers have made a purchase yet."}</td></tr>}
          </tbody>
        </table></div>
      </div>
    </>
  );
}
