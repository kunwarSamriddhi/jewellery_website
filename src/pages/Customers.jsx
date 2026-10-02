import Head from "../components/Head";
import { CUSTOMERS } from "../data/mock";
import { inr } from "../utils";

export default function Customers() {
  return (
    <>
      <Head title="Customers" sub="People who have shopped with you." />
      <div className="card"><div className="tbl-wrap"><table>
        <thead><tr><th>Customer</th><th>Email</th><th>Orders</th><th>Total spent</th></tr></thead>
        <tbody>
          {CUSTOMERS.map((c) => (
            <tr key={c.id}>
              <td>
                <span className="avatar" style={{ display: "inline-grid", width: 34, height: 34, marginRight: 12, verticalAlign: "middle" }}>{c.name[0]}</span>
                <b>{c.name}</b>
              </td>
              <td>{c.email}</td><td>{c.orders}</td><td>{inr(c.spent)}</td>
            </tr>
          ))}
        </tbody>
      </table></div></div>
    </>
  );
}
