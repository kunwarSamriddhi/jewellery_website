import { useState } from "react";
import Head from "../components/Head";

export default function Settings() {
  const [saved, setSaved] = useState(false);
  return (
    <>
      <Head title="Settings" sub="Basic details about your store." />
      <form className="card form settings" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
        <label>Store name<input className="input" defaultValue="Velora Store" /></label>
        <label>Support email<input className="input" type="email" defaultValue="help@velora.store" /></label>
        <div className="row2">
          <label>Currency<select className="input" defaultValue="INR"><option>INR</option><option>USD</option></select></label>
          <label>Free shipping above (₹)<input className="input" type="number" defaultValue="999" /></label>
        </div>
        <div><button className="btn">Save changes</button>{saved && <span className="toast">Saved</span>}</div>
      </form>
    </>
  );
}
