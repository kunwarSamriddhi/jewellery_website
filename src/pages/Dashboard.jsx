import Head from "../components/Head";
import { ORDERS, SALES } from "../data/mock";
import { statusTone } from "../utils";

const STATS = [
  ["Revenue", "₹4.82L", "+12.4%", true],
  ["Orders", "318", "+8.1%", true],
  ["Customers", "1,204", "+3.2%", true],
  ["Returns", "9", "-1.5%", false],
];

export default function Dashboard() {
  const max = Math.max(...SALES.map((s) => s[1]));
  return (
    <>
      <Head title="Dashboard" sub="Here's how your store is doing this month." />
      <div className="stats">
        {STATS.map(([label, value, delta, up]) => (
          <div className="card stat" key={label}>
            <span>{label}</span><b>{value}</b>
            <small className={up ? "up" : "down"}>{delta} vs last month</small>
          </div>
        ))}
      </div>
      <div className="two">
        <div className="card">
          <h3>Sales (₹ thousands)</h3>
          <div className="bars">
            {SALES.map(([m, v]) => (
              <div key={m}><em style={{ height: `${(v / max) * 100}%` }} title={v} /><span>{m}</span></div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3>Recent orders</h3>
          <div className="tbl-wrap"><table><tbody>
            {ORDERS.slice(0, 4).map((o) => (
              <tr key={o.id}>
                <td><b>{o.id}</b><br /><span className="hint">{o.customer}</span></td>
                <td><span className={`badge ${statusTone[o.status]}`}>{o.status}</span></td>
              </tr>
            ))}
          </tbody></table></div>
        </div>
      </div>
    </>
  );
}
