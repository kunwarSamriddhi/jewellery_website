import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Gem } from "lucide-react";
import { clearSession } from "../api/client";
import { STORE } from "../utils";

const LINKS = [
  ["/", "Dashboard", LayoutDashboard],
  ["/products", "Products", Package],
  ["/orders", "Orders", ShoppingBag],
  ["/customers", "Customers", Users],
];

export default function Shell() {
  const nav = useNavigate();
  const logout = () => { clearSession(); nav("/login"); };

  return (
    <div className="shell">
      <aside className="side">
        <div className="brand"><i><Gem size={18} /></i>{STORE}</div>
        {LINKS.map(([to, label, Icon]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => "nav" + (isActive ? " active" : "")}>
            <Icon size={19} /><span>{label}</span>
          </NavLink>
        ))}
        <div className="grow" />
        <button className="nav logout" onClick={logout}><LogOut size={19} /><span>Log out</span></button>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  );
}
